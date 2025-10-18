import OpenAI from "openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PINECONE_INDEX } from "../config";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY as string });
const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY as string,
});
const index = pinecone.index(PINECONE_INDEX as string);

export async function embedBatch(texts: string[]) {
    const res = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: texts,
    });
    return res.data.map(d => d.embedding as number[]);
};

export async function upsertVectors(ids: string[], vectors: number[][], namespace: string, memoryID: string) {
    if(ids.length !== vectors.length) {
        throw new Error("ids and vectors length mismatch");
    };

    const upserts = ids.map((id, i) => ({ 
        id, 
        values: vectors[i],
        metadata: { memoryId: memoryID, chunkIndex: i },
    }));
    await index.namespace(namespace).upsert(upserts);
};

export async function queryVectors(query: number[], topK = 5, namespace: string) {
    const res = await index.namespace(namespace).query({
        vector: query,
        topK,
        includeMetadata: false,
    });
    return res.matches ?? [];
};

export async function deleteMemoryVectors(memoryID: string, namespace: string) {
    await index.namespace(namespace).deleteMany({ memoryId: { $eq: memoryID } });
};