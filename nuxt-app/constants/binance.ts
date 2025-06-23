import type { BinanceIntervalLabel } from 'types';

export const BINANCE_INTERVALS: Array<{
  label: BinanceIntervalLabel;
  ms: number;
}> = [
  { label: '1m', ms: 1 * 60_000 },
  { label: '3m', ms: 3 * 60_000 },
  { label: '5m', ms: 5 * 60_000 },
  { label: '15m', ms: 15 * 60_000 },
  { label: '30m', ms: 30 * 60_000 },
  { label: '1h', ms: 1 * 60 * 60_000 },
  { label: '2h', ms: 2 * 60 * 60_000 },
  { label: '4h', ms: 4 * 60 * 60_000 },
  { label: '6h', ms: 6 * 60 * 60_000 },
  { label: '12h', ms: 12 * 60 * 60_000 },
  { label: '1d', ms: 24 * 60 * 60_000 },
  { label: '3d', ms: 3 * 24 * 60 * 60_000 },
  { label: '1w', ms: 7 * 24 * 60 * 60_000 },
  { label: '1m', ms: 30 * 24 * 60 * 60_000 },
];
