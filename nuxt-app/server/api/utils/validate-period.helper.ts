import { createError } from 'h3';

import { PERIODS } from '~/constants';
import type { Period } from '~/types';

export function validatePeriod(period: unknown): asserts period is Period {
  if (typeof period !== 'string' || !PERIODS.includes(period as Period)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Неверный период: ${String(period)}`,
    });
  }
}
