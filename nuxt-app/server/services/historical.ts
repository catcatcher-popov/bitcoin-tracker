import axios from 'axios';

import type { PricePoint, BinanceIntervalLabel } from 'types';
import { BINANCE_API_URL, DATA_POINTS_LIMIT, SYMBOL } from '~/constants';
import { getPrisma } from '~/server/db/prismaClient';
import { selectInterval } from '~/utils/selectInterval';

export async function fetchAndSaveHistoricalPrices(from: Date, to: Date): Promise<void> {
  const prisma = await getPrisma();

  const existing = await prisma.price.findMany({
    where: { timestamp: { gte: from, lte: to } },
    select: { timestamp: true },
  });
  const have = new Set(existing.map((r) => +r.timestamp));

  const interval: BinanceIntervalLabel = selectInterval(from, to);

  const resp = await axios.get<any[]>(`${BINANCE_API_URL}/klines`, {
    params: {
      symbol: SYMBOL,
      interval,
      startTime: from.getTime(),
      endTime: to.getTime(),
      limit: DATA_POINTS_LIMIT,
    },
  });

  const points: PricePoint[] = resp.data.map((k) => ({
    timestamp: new Date(k[0]),
    price: parseFloat(k[4]),
  }));

  await prisma.price.createMany({
    data: points
      .filter((p) => !have.has(+p.timestamp))
      .map((p) => ({ timestamp: p.timestamp, price: p.price })),
    skipDuplicates: true,
  });
}
