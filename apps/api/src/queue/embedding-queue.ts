import { Queue } from "bullmq";
import { QUEUE_NAME, REDIS_URL } from "../config";
import IORedis from "ioredis";

export const redisConnection = new IORedis(REDIS_URL);
export const embeddingsQueue = new Queue(QUEUE_NAME, { connection: redisConnection });