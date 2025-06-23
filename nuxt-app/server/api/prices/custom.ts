import { getQuery, readBody, createError } from 'h3';

import { createHandler } from '../utils/createHandler';

import type { PricePoint } from 'types';
import { CustomPeriodSchema } from 'types';
import { getPrisma } from '~/server/db/prismaClient';
import { fetchAndSaveHistoricalPrices } from '~/server/services';

export default createHandler<{ data: PricePoint[] }>(async (event) => {
  const {
    from: qFrom,
    to: qTo,
    refresh,
  } = getQuery(event) as {
    from?: string;
    to?: string;
    refresh?: string;
  };
  let from = qFrom;
  let to = qTo;

  if (!from || !to) {
    const body = await readBody(event);
    const parsed = CustomPeriodSchema.safeParse(body);
    if (!parsed.success) {
      throw createError({
        statusCode: 422,
        statusMessage: parsed.error.message,
      });
    }
    from = parsed.data.from;
    to = parsed.data.to;
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

  return {
    data: records.map<PricePoint>((r) => ({
      timestamp: r.timestamp,
      price: r.price,
    })),
  };
});
