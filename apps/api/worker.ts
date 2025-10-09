import 'dotenv/config';
import { startWorker } from './src/workers/embeddings-workers'

const worker = startWorker({ concurrency: Number(process.env.WORKER_CONCURRENCY ?? 4) });