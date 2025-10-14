// src/workers/embeddings.worker.ts
import { Worker } from 'bullmq';
import { redisConnection } from '../queue/embedding-queue';
import { processEmbeddingJob } from '../jobs/embed-job';
import { QUEUE_NAME, WORKER_CONCURRENCY, BATCH_SIZE, BATCH_WAIT_MS, DLQ_ATTEMPTS } from '../config';
import { prisma } from 'db';

type BufferedItem = {
  job: any;
  resolve: () => void;
  reject: (err: any) => void;
};

let localBuffer: BufferedItem[] = [];
let bufferTimer: NodeJS.Timeout | null = null;

async function flushBuffer() {
  const items = localBuffer.splice(0, Number(BATCH_SIZE));
  if (items.length === 0) return;

  for (const item of items) {
    const job = item.job;
    try {
      if (job.data?.jobId) {
        try {
          await prisma.embeddingJob.updateMany({
            where: { id: job.data.jobId, status: { not: 'processing' } },
            data: { status: 'processing', attempts: { increment: 1 }, updatedAt: new Date() },
          });
        } catch (e) {
          console.warn('warning: could not mark job processing', job.data?.jobId, e);
        }
      }

      await processEmbeddingJob(job.data);

      if (job.data?.jobId) {
        try {
          await prisma.embeddingJob.update({
            where: { id: job.data.jobId },
            data: { status: 'done', updatedAt: new Date() },
          });
        } catch (e) {
          console.warn('warning: could not mark job done', job.data?.jobId, e);
        }
      }

      item.resolve();
    } catch (err) {
      item.reject(err);
    }
  }
}

function scheduleFlush() {
  if (bufferTimer) return;
  bufferTimer = setTimeout(async () => {
    bufferTimer = null;
    try {
      await flushBuffer();
    } catch (e) {
      console.error('flushBuffer error', e);
    }
    if (localBuffer.length > 0) scheduleFlush();
  }, Number(BATCH_WAIT_MS));
}

export function startWorker(opts = { concurrency: WORKER_CONCURRENCY }) {

  const worker = new Worker(
    QUEUE_NAME,
    async (job) => {
      return await new Promise<void>((resolve, reject) => {
        localBuffer.push({ job, resolve, reject });

        if (localBuffer.length >= Number(BATCH_SIZE)) {
          if (bufferTimer) { clearTimeout(bufferTimer); bufferTimer = null; }
          scheduleFlush();
        } else {
          scheduleFlush();
        }
      });
    },
    {
      connection: redisConnection,
      concurrency: Number(opts.concurrency ?? WORKER_CONCURRENCY),
      lockDuration: 5 * 60 * 1000,
    }
  );

  worker.on('failed', async (job, err) => {
    try {
      const attemptsMade = job?.attemptsMade ?? 0;
      const threshold = Number(DLQ_ATTEMPTS ?? DLQ_ATTEMPTS);
      if (job?.data?.jobId && attemptsMade >= threshold) {
        await prisma.embeddingJob.update({
          where: { id: job.data.jobId },
          data: { status: 'failed', lastError: String(err ?? ''), updatedAt: new Date() },
        });
      }
    } catch (e) {
      console.error('error marking DB job failed after exhausted attempts', e);
    }
    console.error('job failed', job?.id, err?.message ?? err);
  });

  return worker;
}
