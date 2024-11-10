import { use } from "react";
import { z } from "zod";

export const userZodSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(5),
});

export const userZodSchemaForLogin = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
