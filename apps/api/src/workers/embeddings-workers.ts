import { Worker } from "bullmq";
import { QUEUE_NAME, WORKER_CONCURRENCY } from "../config";

let localBuffer: any[] = [];
let bufferTimer: NodeJS.Timeout | null = null;

export function startWorker(opts = { concurrency: WORKER_CONCURRENCY }) {
    const worker = new Worker(QUEUE_NAME, async (job) => {
        localBuffer.push(job);
    });

    worker.on('failed', async (job, err) => {
        console.error('job failed', job?.id, err?.message)
    });
    
    return worker;
};