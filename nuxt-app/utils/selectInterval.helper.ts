import type { BinanceIntervalLabel } from 'types';
import { BINANCE_INTERVALS } from '~/constants';

export function selectInterval(from: Date, to: Date): BinanceIntervalLabel {
  const span = to.getTime() - from.getTime();
  const target = 2000;
  const ideal = span / target;
  return BINANCE_INTERVALS.find((i) => i.ms >= ideal)?.label ?? BINANCE_INTERVALS[-1].label;
}
