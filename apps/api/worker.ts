import 'dotenv/config';
import { startWorker } from './src/workers/embeddings-workers'

const worker = startWorker({ concurrency: Number(process.env.WORKER_CONCURRENCY ?? 4) });

process.on('SIGINT', async() => {
    console.log('SIGINT received: shutting down worker...');
    await worker.close();
    process.exit(0);
});

process.on('SIGTERM', async() => {
    console.log('SIGTERM received: shutting down worker...');
    await worker.close();
    process.exit(0);
});

