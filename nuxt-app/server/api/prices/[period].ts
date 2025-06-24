import { getQuery } from 'h3';

import { createHandler, validatePeriod } from '../utils';

import type { Period } from 'types';
import { parsePeriod } from 'utils';
import type { Price } from '~/server/domain/entities/price.entity';
import { GetPriceHistoryUseCase } from '~/server/domain/use-cases/get-price-history.use-case';

export default createHandler<{ data: Price[] }>(async (event) => {
  const raw = event.context.params?.period;
  validatePeriod(raw);
  const period = raw as Period;

  const { from, to } = parsePeriod(period);
  const { refresh } = getQuery(event) as { refresh?: string };

  const useCase = new GetPriceHistoryUseCase();
  const prices = await useCase.execute(from, to, refresh === 'true');

  return { data: prices };
});
