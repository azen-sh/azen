import OpenAI from "openai";
import { Pinecone } from "@pinecone-database/pinecone";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY as string,
});
const index = pinecone.index(process.env.PINECONE_INDEX as string);

export async function embedBatch(texts: string[]) {
    const res = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: texts,
    });
    return res.data.map(d => d.embedding as number[]);
};

export async function upsertVectors(ids: string[], vectors: number[][], namespace: string) {
    if(ids.length !== vectors.length) {
        throw new Error("ids and vectors length mismatch");
    };

    const upserts = ids.map((id, i) => ({ id, values: vectors[i] }));
    await index.namespace(namespace).upsert(upserts);
};

export async function queryVectors(query: number[], topK = 5, namespace: string) {
    const res = await index.namespace(namespace).query({
        vector: query,
        topK,
        includeMetadata: false,
    })
    return res.matches ?? [];
};