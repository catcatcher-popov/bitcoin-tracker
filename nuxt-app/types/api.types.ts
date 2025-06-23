import { z } from 'zod';

export const CustomPeriodSchema = z.object({
  from: z.string().refine((s) => !isNaN(Date.parse(s)), 'Invalid date'),
  to: z.string().refine((s) => !isNaN(Date.parse(s)), 'Invalid date'),
});

export type CustomPeriodDTO = z.infer<typeof CustomPeriodSchema>;

export type BinanceIntervalLabel =
  | '1m'
  | '3m'
  | '5m'
  | '15m'
  | '30m'
  | '1h'
  | '2h'
  | '4h'
  | '6h'
  | '12h'
  | '1d'
  | '3d'
  | '1w'
  | '1m';
