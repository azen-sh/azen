import { Worker } from "bullmq";
import { BATCH_SIZE, QUEUE_NAME, WORKER_CONCURRENCY } from "../config";
import { redisConnection } from "../queue/embedding-queue";
import { processEmbeddingJob } from "../jobs/embed-job";

let localBuffer: any[] = [];
let bufferTimer: NodeJS.Timeout | null = null;

export function startWorker(opts = { concurrency: WORKER_CONCURRENCY }) {
    const worker = new Worker(QUEUE_NAME, async (job) => {
        localBuffer.push(job);
        if(localBuffer.length >= BATCH_SIZE) {
            const jobList = localBuffer.splice(0, 5);
            for(const j of jobList) {
                await processEmbeddingJob(j.data);
            };
        } else {

        };

    }, {
        connection: redisConnection,
    });

    worker.on('failed', async (job, err) => {
        console.error('job failed', job?.id, err?.message)
    });

    return worker;
};