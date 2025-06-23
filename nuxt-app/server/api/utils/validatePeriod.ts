import { createError } from 'h3';

import { PERIODS, type Period } from '~/constants/periods';

export function validatePeriod(period: unknown): asserts period is Period {
  if (typeof period !== 'string' || !PERIODS.includes(period as Period)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Неверный период: ${String(period)}`,
    });
  }
}
