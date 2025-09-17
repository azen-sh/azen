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
    return res.data.map
};
