import {
    createCipheriv,
    createDecipheriv,
    randomBytes,
  } from "crypto";
  
import { AZEN_MASTER_KEY } from "../config";

const ALGO = "aes-256-gcm";
const KEY = Buffer.from(AZEN_MASTER_KEY!, "hex");

export function encryptText(plainText: string) {
    const iv = randomBytes(12);
    const cipher = createCipheriv(ALGO, KEY, iv);

    const encrypted = Buffer.concat([
        cipher.update(plainText, "utf8"),
        cipher.final(),
    ]);

    const tag = cipher.getAuthTag();

    return {
        ciphertext: encrypted.toString("base64"),
        iv: iv.toString("base64"),
        tag: tag.toString("base64"),
    };
};

export function decryptText(
    ciphertext: string,
    iv: string,
    tag: string,
) {
    const decipher = createDecipheriv(
        ALGO,
        KEY,
        Buffer.from(iv, "base64")
    );

    decipher.setAuthTag(Buffer.from(tag, "base64"));

    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(ciphertext, "base64")),
        decipher.final(),
    ]);

    return decrypted.toString("utf8");
};