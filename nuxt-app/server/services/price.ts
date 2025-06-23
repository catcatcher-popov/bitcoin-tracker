import { fetchLatestPrice } from './binance';

import type { PricePoint } from 'types';
import { getPrisma } from '~/server/db/prismaClient';

export async function collectAndSavePrice(): Promise<PricePoint> {
  const price = await fetchLatestPrice();
  const timestamp = new Date();
  const prisma = await getPrisma();
  const record = await prisma.price.create({
    data: { timestamp, price },
  });
  return {
    timestamp: record.timestamp,
    price: record.price,
  };
}
