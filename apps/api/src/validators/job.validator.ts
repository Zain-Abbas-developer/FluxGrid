import { z } from "zod";

export const createJobSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Job name is required")
    .max(200, "Job name cannot exceed 200 characters"),

  type: z
    .string()
    .trim()
    .min(1, "Job type is required")
    .max(100, "Job type cannot exceed 100 characters"),

  payload: z
    .unknown(),

  priority: z
    .number()
    .int()
    .min(1)
    .max(10)
    .optional(),

  timeout: z
    .number()
    .int()
    .positive()
    .max(3600000)
    .optional(),
});

export const jobIdSchema = z.object({
  id: z
    .string()
    .min(1, "Job ID is required"),
});

export const jobQuerySchema = z.object({
  page: z.coerce
    .number()
    .int()
    .min(1)
    .optional(),

  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(100)
    .optional(),

  status: z
    .enum([
      "pending",
      "queued",
      "running",
      "completed",
      "failed",
      "cancelled",
    ])
    .optional(),
});