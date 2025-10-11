import { prisma } from "db";
import { chunkText } from "../lib/chunk";
import { embedBatch, upsertVectors } from "../lib/vector";

export type EmbedPayLoad = {
    memoryId: string;
    text: string;
    userId: string;
    jobId: string;
};

export async function processEmbeddingJob(payload: EmbedPayLoad) {
    const text = payload.text;
    if(!text) throw new Error("no text found to embed");

    const chunks = chunkText(text);
    const vectors = await embedBatch(chunks);
    if(!vectors || vectors.length !== chunks.length ) throw new Error("embedding mismatch");

    const ids = chunks.map((_, i) => `${payload.memoryId}::${i}`);
    const namespace = `user-${payload.userId}`;

    await upsertVectors(ids, vectors, namespace);

    //to update metadata in postgres db - 
    await prisma.memory.update({
        where: {
            id: payload.memoryId,
        },
        data: {
            embedded: true,
        },
    });

    if(payload.jobId) {
        await prisma.embeddingJob.update({ where: { id: payload.jobId }, data: { status: 'done' } });
    } else {
        await prisma.embeddingJob.updateMany({ where: { memoryId: payload.memoryId }, data: { status: 'done' } });
    }
};