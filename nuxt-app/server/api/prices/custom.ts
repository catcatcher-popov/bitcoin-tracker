import { defineEventHandler, readBody, createError } from 'h3';

import { getPrisma } from '~/server/db';
import { CustomPeriodSchema } from '~/types';
import type { PricePoint, CustomPeriodDTO } from '~/types';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const parse = CustomPeriodSchema.safeParse(body);
  if (!parse.success) {
    throw createError({ statusCode: 422, statusMessage: parse.error.message });
  }
  const { from, to } = parse.data as CustomPeriodDTO;
  const prisma = await getPrisma();

  const records = await prisma.price.findMany({
    where: {
      timestamp: {
        gte: new Date(from),
        lte: new Date(to),
      },
    },
    orderBy: { timestamp: 'asc' },
  });

  const data: PricePoint[] = records.map((r) => ({
    timestamp: r.timestamp,
    price: r.price,
  }));

  return { data };
});
