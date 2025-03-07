import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must have at least 8 characters." })
    .max(256, { message: "Password have at most 256 characters." }),
});
