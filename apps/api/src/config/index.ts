const NODE_ENV = process.env.NODE_ENV ?? 'development';
const isProd = NODE_ENV === 'production';

export const PINECONE_INDEX = isProd 
    ? process.env.PINECONE_INDEX_PROD 
    : process.env.PINECONE_INDEX_DEV;

export const REDIS_URL = isProd 
    ? process.env.REDIS_URL_PROD 
    : process.env.REDIS_URL_DEV ?? 'redis://localhost:6379';

export const QUEUE_NAME = process.env.QUEUE_NAME || 'embeddings';
export const WORKER_CONCURRENCY = Number(process.env.WORKER_CONCURRENCY ?? 4);
export const BATCH_SIZE = Number(process.env.BATCH_SIZE ?? 5);
export const BATCH_WAIT_MS = Number(process.env.BATCH_WAIT_MS ?? 60);
export const RATE_MIN_TIME = Number(process.env.RATE_MIN_TIME ?? 200);
export const RATE_MAX_CONCURRENT = Number(process.env.RATE_MAX_CONCURRENT ?? 2);
export const DLQ_ATTEMPTS = Number(process.env.DLQ_ATTEMPTS ?? 5);
export const METRICS_PORT = Number(process.env.METRICS_PORT ?? 3002);