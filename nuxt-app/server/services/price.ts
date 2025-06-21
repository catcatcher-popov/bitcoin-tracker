import { getPrisma } from '../db/prismaClient';

import { fetchLatestPrice } from './binance';

import type { PricePoint } from '~/types';

/**
 * Собирает цену и сохраняет её в БД.
 * PrismaClient создаётся только при вызове, а не при сборке Nuxt.
 */
export async function collectAndSavePrice(): Promise<PricePoint> {
  const price = await fetchLatestPrice();
  const timestamp = new Date();
  const prisma = await getPrisma();

  const record = await prisma.price.create({
    data: { timestamp, price },
  });

  return { timestamp: record.timestamp, price: record.price };
}
