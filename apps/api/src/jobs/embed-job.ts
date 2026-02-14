import { db, eq, schema } from "db";
import { chunkText } from "../lib/chunk";
import { embedBatch, upsertVectors } from "../lib/vector";

export type EmbedPayLoad = {
    memoryId: string;
    text: string;
    userId: string;
    organizationId: string;
    jobId: string;
};

const { memory, embeddingJob } = schema;

export async function processEmbeddingJob(payload: EmbedPayLoad) {
    const { text, memoryId, organizationId, jobId } = payload;
    if (!text) throw new Error("no text found to embed");
    if (!organizationId) throw new Error("missing organizationId");

    const chunks = chunkText(text);
    const vectors = await embedBatch(chunks);
    if(!vectors || vectors.length !== chunks.length ) throw new Error("embedding mismatch");

    const ids = chunks.map((_, i) => `${memoryId}::${i}`);
    const namespace = `org-${organizationId}`;
    const memoryID = payload.memoryId;

    await upsertVectors(ids, vectors, namespace, memoryID);

    // mark memory embedded
    await db
      .update(memory)
      .set({ embedded: true })
      .where(eq(memory.id, memoryId));

  // mark job done
    await db
      .update(embeddingJob)
      .set({ status: "done" })
      .where(eq(embeddingJob.id, jobId));
};