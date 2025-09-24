import { prisma } from 'db';
import { chunkText } from "../src/lib/chunk";
import { embedBatch, upsertVectors } from "../src/lib/vector";

const POLL_INTERVAL = 2000;
const BATCH_SIZE = 5;
const MAX_ATTEMPTS = 5;

function backoffMs(attempt: number) {
    const base = 2000; 
    const raw = base * Math.pow(2, Math.max(0, attempt - 1));
    const jitter = Math.floor(Math.random() * 1000); 
    return raw + jitter;
  }

async function processJob(job) {
    try {
        await prisma.embeddingJob.update({
            where: {
                id: job.id,
            },
            data: {
                status: 'processing',
                attempts: job.attempts + 1,
            },
        });
        const mem = await prisma.memory.findUnique({ where: { id: job.memoryId } });
        if(!mem) {
            await prisma.embeddingJob.update({ 
                where: { id: job.id }, 
                data: { 
                    status: 'failed', 
                    lastError: 'memory not found', 
                }, 
            });
            return
        };

        const chunks = chunkText(mem.content);
        const vectors = await embedBatch(chunks);
        const ids = chunks.map((_, i) => `${mem.id}::${i}`);

        const namespace = `user-${mem.userId}`;

        await upsertVectors(ids, vectors, namespace);

        await prisma.memory.update({ where: { id: mem.id }, data: { embedded: true, }, });
        await prisma.embeddingJob.update({ where: { id: job.id }, data: { status: "done" }, });
    } catch (e) {
        console.error("embedding worker error:", e);
        const attempts = (job.attempts ?? 0) + 1;

        if(attempts < MAX_ATTEMPTS) {
            const delay = backoffMs(attempts);
            const availableAt = new Date(Date.now() + delay);

            await prisma.embeddingJob.update({
                where: {
                    id: job.id,
                },
                data: {
                    status: 'pending',
                    attempts,
                    availableAt,
                    lastError: String(e),
                },
            });
        } else {
            await prisma.embeddingJob.update({
                where: { id: job.id },
                data: { status: 'failed', attempts, lastError: String(e) }
              });
        };
    };
};

async function poll() {
    const now = new Date();
    while(true) {
        const jobs = await prisma.embeddingJob.findMany({
            where: { status: 'pending',
                     availableAt: { lte: now },
             },
            orderBy: { createdAt: 'asc' },
            take: BATCH_SIZE,
        });
        for (const job of jobs) {
            await processJob(job);
        };
        await new Promise(r => setTimeout(r, POLL_INTERVAL));
    };
};

poll().catch(e => { console.error(e); process.exit(1) });