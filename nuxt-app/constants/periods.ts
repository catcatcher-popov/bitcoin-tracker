export const PERIODS = ['day', 'week', 'month', 'year', 'custom'] as const;
export type Period = (typeof PERIODS)[number];
