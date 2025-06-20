import { z } from "zod";

export const CustomPeriodSchema = z.object({
  from: z.string().refine((s) => !isNaN(Date.parse(s)), "Invalid date"),
  to: z.string().refine((s) => !isNaN(Date.parse(s)), "Invalid date"),
});

export type CustomPeriodDTO = z.infer<typeof CustomPeriodSchema>;
