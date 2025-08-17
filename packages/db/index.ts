import { PrismaClient } from "./generated/prisma";

declare global {
    var __prisma: PrismaClient | undefined
}

export const prisma: PrismaClient =
  global.__prisma ??
  new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
    global.__prisma = prisma
}
