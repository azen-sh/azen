import { prisma } from 'db';
import { chunkText } from "../src/lib/chunk";

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
        const mem = await prisma.memory.findUnique({ where: { id: job.id } });
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