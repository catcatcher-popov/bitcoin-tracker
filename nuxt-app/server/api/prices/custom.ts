import { getQuery, readBody, createError } from 'h3';

import { createHandler } from '../utils/create-handler.helper';

import { CustomPeriodSchema } from 'types';
import type { Price } from '~/server/domain/entities/price.entity';
import { GetPriceHistoryUseCase } from '~/server/domain/use-cases/get-price-history.use-case';

export default createHandler<{ data: Price[] }>(async (event) => {
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

  const useCase = new GetPriceHistoryUseCase();

  const prices = await useCase.execute(fromDate, toDate, refresh === 'true');

  return { data: prices };
});
