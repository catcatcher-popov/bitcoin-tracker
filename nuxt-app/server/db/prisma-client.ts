/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// server/db/prismaClient.ts
import type { PrismaClient } from '@prisma/client';

declare global {
  var __prismaClient: PrismaClient | undefined;
}

export async function getPrisma(): Promise<PrismaClient> {
  // @ts-ignore-global
  if (!global.__prismaClient) {
    const mod = await import('@prisma/client');
    // @ts-ignore-global
    global.__prismaClient = new mod.PrismaClient();
  }
  // @ts-ignore-global
  return global.__prismaClient;
}
