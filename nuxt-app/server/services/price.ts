import { prisma } from '../db/prismaClient';

import { fetchLatestPrice } from './binance';

import type { PricePoint } from '~/types';

export async function collectAndSavePrice(): Promise<PricePoint> {
  const price = await fetchLatestPrice();
  const timestamp = new Date();

  const record = await prisma.price.create({
    data: { timestamp, price },
  });

  return { timestamp: record.timestamp, price: record.price };
}
