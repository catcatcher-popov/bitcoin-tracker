import type { PrismaClient } from '@prisma/client'

declare global {
  // В режиме dev храним клиент в глобале
  var __prismaClient: PrismaClient | undefined
}

/**
 * Ленивый синглтон PrismaClient.
 * Динамический import() гарантирует, что он будет загружен только в рантайме.
 */
export async function getPrisma(): Promise<PrismaClient> {
  // @ts-ignore
  if (!global.__prismaClient) {
    // Динамический импорт вместо require
    const { PrismaClient } = await import('@prisma/client')
    // @ts-ignore
    global.__prismaClient = new PrismaClient()
  }
  // @ts-ignore
  return global.__prismaClient
}
