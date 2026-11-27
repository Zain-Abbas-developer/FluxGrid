import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2)
    .max(100),

  email: z
    .string()
    .trim()
    .email()
    .toLowerCase(),

  password: z
    .string()
    .min(8)
    .max(128),

  role: z
    .enum([
      "SUPER_ADMIN",
      "ORG_ADMIN",
      "OPERATOR",
      "ANALYST",
      "GUEST",
    ])
    .optional(),
});

export const updateUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .optional(),

  email: z
    .string()
    .trim()
    .email()
    .toLowerCase()
    .optional(),

  role: z
    .enum([
      "SUPER_ADMIN",
      "ORG_ADMIN",
      "OPERATOR",
      "ANALYST",
      "GUEST",
    ])
    .optional(),
});

export const userIdSchema = z.object({
  id: z.string().min(1),
});