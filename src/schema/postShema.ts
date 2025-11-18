import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  body: z.string().min(10, "El contenido debe tener al menos 10 caracteres"),
  userId: z
    .number( "UserId debe ser un número")
    .int()
    .positive()
    .optional()
});

export type PostFormData = z.infer<typeof postSchema>;
