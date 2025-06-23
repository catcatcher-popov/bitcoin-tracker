import { getQuery } from 'h3';

import { createHandler } from '../utils/createHandler';
import { validatePeriod } from '../utils/validatePeriod';

import type { PricePoint } from 'types';
import type { Period } from '~/constants/periods';
import { getPrisma } from '~/server/db/prismaClient';
import { fetchAndSaveHistoricalPrices } from '~/server/services';
import { parsePeriod } from '~/utils';

export default createHandler<{ data: PricePoint[] }>(async (event) => {
  const periodRaw = event.context.params?.period;
  validatePeriod(periodRaw);
  const period = periodRaw as Period;

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

  return {
    data: records.map<PricePoint>((r) => ({
      timestamp: r.timestamp,
      price: r.price,
    })),
  };
});
