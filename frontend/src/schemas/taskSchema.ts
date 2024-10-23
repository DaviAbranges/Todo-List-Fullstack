import { z } from "zod";

export const taskSchema = z.object({
  name: z
    .string()
    .min(4, { message: "O nome deve ter no mínimo 4 caracteres" }),
  status: z.string(),
});
