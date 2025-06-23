import { defineEventHandler, createError, getQuery } from 'h3';

import type { PricePoint } from 'types';
import type { Period } from '~/constants/periods';
import { getPrisma } from '~/server/db';
import { fetchAndSaveHistoricalPrices } from '~/server/services/historical';
import { parsePeriod } from '~/utils/parsePeriod.helper';

export default defineEventHandler(async (event) => {
  const period = event.context.params?.period as Period;
  if (!['day', 'week', 'month', 'year'].includes(period)) {
    throw createError({ statusCode: 400, statusMessage: 'Неверный период' });
  }
  const { from, to } = parsePeriod(period);

  const { refresh } = getQuery(event) as { refresh?: string };

  if (refresh === 'true') {
    await fetchAndSaveHistoricalPrices(from, to);
  }

  const prisma = await getPrisma();
  const records = await prisma.price.findMany({
    where: { timestamp: { gte: from, lte: to } },
    orderBy: { timestamp: 'asc' },
  });
  const data: PricePoint[] = records.map((r) => ({ timestamp: r.timestamp, price: r.price }));
  return { data };
});
