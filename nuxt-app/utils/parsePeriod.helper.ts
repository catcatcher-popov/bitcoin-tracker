import type { SetPeriod } from '~/types';
export function parseSetPeriod(period: SetPeriod): {
  from: Date;
  to: Date;
} {
  const to = new Date();
  const from = new Date(to);
  switch (period) {
    case 'day':
      from.setDate(to.getDate() - 1);
      break;
    case 'week':
      from.setDate(to.getDate() - 7);
      break;
    case 'month':
      from.setMonth(to.getMonth() - 1);
      break;
    case 'year':
      from.setFullYear(to.getFullYear() - 1);
      break;
    default:
      throw new Error(`Invalid period: ${period}`);
  }
  return { from, to };
}
