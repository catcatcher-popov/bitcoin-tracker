import { defineEventHandler, createError } from 'h3';

import { getPrisma } from '~/server/db';
import { fetchAndSaveHistoricalPrices } from '~/server/services/historical';
import type { PricePoint } from '~/types';
import { parsePeriod } from '~/utils';

export default defineEventHandler(async (event) => {
  const period = event.context.params?.period as string;
  if (!['day', 'week', 'month', 'year'].includes(period)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid period' });
  }

  const { from, to } = parsePeriod(period as 'day' | 'week' | 'month' | 'year');

  // **Проверяем и докачиваем** исторические свечи
  await fetchAndSaveHistoricalPrices(from, to);

  const prisma = await getPrisma();
  const records = await prisma.price.findMany({
    where: { timestamp: { gte: from, lte: to } },
    orderBy: { timestamp: 'asc' },
  });

  const data: PricePoint[] = records.map((r) => ({
    timestamp: r.timestamp,
    price: r.price,
  }));

  return { data };
});
