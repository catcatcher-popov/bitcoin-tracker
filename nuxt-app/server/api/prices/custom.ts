import { defineEventHandler, readBody, createError, getQuery } from 'h3';

import { CustomPeriodSchema } from 'types';
import type { PricePoint } from 'types';
import { getPrisma } from '~/server/db/prismaClient';
import { fetchAndSaveHistoricalPrices } from '~/server/services/historical';

export default defineEventHandler(async (event) => {
  const {
    from: qFrom,
    to: qTo,
    refresh,
  } = getQuery(event) as {
    from?: string;
    to?: string;
    refresh?: string;
  };
  let from: string | undefined = qFrom;
  let to: string | undefined = qTo;

  if (!from || !to) {
    const body = await readBody(event);
    const parse = CustomPeriodSchema.safeParse(body);
    if (!parse.success) {
      throw createError({
        statusCode: 422,
        statusMessage: parse.error.message,
      });
    }
    from = parse.data.from;
    to = parse.data.to;
  }

  const fromDate = new Date(from);
  const toDate = new Date(to);

  if (refresh === 'true') {
    await fetchAndSaveHistoricalPrices(fromDate, toDate);
  }

  const prisma = await getPrisma();
  const records = await prisma.price.findMany({
    where: {
      timestamp: { gte: fromDate, lte: toDate },
    },
    orderBy: { timestamp: 'asc' },
  });

  const data: PricePoint[] = records.map((r) => ({
    timestamp: r.timestamp,
    price: r.price,
  }));
  return { data };
});
