import axios from 'axios';

import type { PricePoint, BinanceIntervalLabel } from 'types';
import { BINANCE_INTERVALS } from '~/constants';
import { getPrisma } from '~/server/db/prismaClient';

function selectInterval(from: Date, to: Date): BinanceIntervalLabel {
  const span = to.getTime() - from.getTime();
  const target = 2000;
  const ideal = span / target;
  return BINANCE_INTERVALS.find((i) => i.ms >= ideal)?.label ?? BINANCE_INTERVALS[-1].label;
}

export async function fetchAndSaveHistoricalPrices(from: Date, to: Date): Promise<void> {
  const prisma = await getPrisma();
  const haveArr = await prisma.price.findMany({
    where: { timestamp: { gte: from, lte: to } },
    select: { timestamp: true },
  });
  const haveSet = new Set(haveArr.map((r) => +r.timestamp));

  const interval = selectInterval(from, to);
  const resp = await axios.get<any[]>('https://api.binance.com/api/v3/klines', {
    params: {
      symbol: 'BTCUSDT',
      interval,
      startTime: from.getTime(),
      endTime: to.getTime(),
      limit: 4000,
    },
  });

  const points: PricePoint[] = resp.data.map((k) => ({
    timestamp: new Date(k[0]),
    price: parseFloat(k[4]),
  }));

  await prisma.price.createMany({
    data: points
      .filter((p) => !haveSet.has(+p.timestamp))
      .map((p) => ({ timestamp: p.timestamp, price: p.price })),
    skipDuplicates: true,
  });
}
