import { z } from "zod";

export const taskSchema = z.object({
  name: z
    .string()
    .max(13)
    .min(4, { message: "O nome deve ter no mínimo 4 caracteres" }),
  status: z.string(),
});
