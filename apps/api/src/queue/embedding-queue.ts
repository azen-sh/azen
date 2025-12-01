import { Queue } from "bullmq";
import { QUEUE_NAME } from "../config";
import { bullRedis } from "../redis/clients";

export const embeddingsQueue = new Queue(QUEUE_NAME, {
  connection: bullRedis,
});
