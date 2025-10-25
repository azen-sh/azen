import { db, eq, schema } from "db";
import { chunkText } from "../lib/chunk";
import { embedBatch, upsertVectors } from "../lib/vector";

export type EmbedPayLoad = {
    memoryId: string;
    text: string;
    userId: string;
    jobId: string;
};

const { memory, embeddingJob } = schema;

export async function processEmbeddingJob(payload: EmbedPayLoad) {
    const text = payload.text;
    if(!text) throw new Error("no text found to embed");

    const chunks = chunkText(text);
    const vectors = await embedBatch(chunks);
    if(!vectors || vectors.length !== chunks.length ) throw new Error("embedding mismatch");

    const ids = chunks.map((_, i) => `${payload.memoryId}::${i}`);
    const namespace = `user-${payload.userId}`;
    const memoryID = payload.memoryId;

    await upsertVectors(ids, vectors, namespace, memoryID);

    //to update metadata in postgres db - 
    await db
    .update(memory)
    .set({
        embedded: true,
    })
    .where(eq(memory.id, memoryID));


    if(payload.jobId) {
        await db
        .update(embeddingJob)
        .set({
            status: "done",
        })
        .where(eq(embeddingJob.id, memoryID));
    } else {
        await db
        .update(embeddingJob)
        .set({
            status: "done",
        })
        .where(eq(embeddingJob.memoryId, memoryID));
    };
};