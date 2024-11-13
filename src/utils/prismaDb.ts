import { PrismaClient } from "@prisma/client";

declare global {
  var client: PrismaClient;
}

export let prisma = globalThis.client ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.client = prisma;
}
