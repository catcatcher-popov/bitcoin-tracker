import axios from 'axios';

import { BINANCE_API_URL, SYMBOL } from '~/constants';
import type { Price } from '~/server/domain/entities/price.entity';
import { PriceRepository } from '~/server/domain/repositories/price.repository';
import { selectInterval } from '~/utils';

export async function fetchAndSaveHistoricalPrices(from: Date, to: Date): Promise<void> {
  const repo = new PriceRepository();

  const existing = await repo.findByPeriod(from, to);
  const have = new Set(existing.map((p) => +p.timestamp));

  const interval = selectInterval(from, to);

  const resp = await axios.get<any[]>(`${BINANCE_API_URL}/klines`, {
    params: {
      symbol: SYMBOL,
      interval,
      startTime: from.getTime(),
      endTime: to.getTime(),
      limit: 1000,
    },
  });

  const points: Price[] = resp.data.map((k) => ({
    timestamp: new Date(k[0]),
    price: parseFloat(k[4]),
  }));

  await repo.saveMany(points.filter((p) => !have.has(+p.timestamp)));
}
