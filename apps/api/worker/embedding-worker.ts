import { prisma } from 'db';
import { chunkText } from "../src/lib/chunk";
import { embedBatch, upsertVectors } from "../src/lib/vector";

const POLL_INTERVAL = 2000;
const BATCH_SIZE = 5;

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
        console.log(mem);
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
        console.log(chunks);
        const vectors = await embedBatch(chunks);
        console.log(vectors);

        await upsertVectors();
    } catch (e) {
        console.error("embedding worker error:", e);
        await prisma.embeddingJob.update({ where: { id: job.id }, data: { status: 'failed', lastError: String(e) }, })
    };
};

async function poll() {
    while(true) {
        const jobs = await prisma.embeddingJob.findMany({
            where: { status: 'pending' },
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