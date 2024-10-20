// /schemas/registrationSchema.ts
import * as z from "zod";

export const registrationSchema = z.object({
  username: z
    .string()
    .min(2, { message: "O nome deve ter no mínimo 2 caracteres" }),
  email: z.string().email({ message: "E-mail inválido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
  role: z.string(),
});
