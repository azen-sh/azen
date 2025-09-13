import { encodingForModel } from 'js-tiktoken';

const enc = encodingForModel('gpt-4o');

export function chunkText(text: string, maxTokens = 512, overlap = 50) {
    const tokens = enc.encode(text);
    const chunks: string[] = [];
    for(let i = 0; i < tokens.length; i += (maxTokens - overlap)) {
        const sliced = tokens.slice(i, i + maxTokens);
        chunks.push(enc.decode(sliced));
    };
    return chunks;
}; 