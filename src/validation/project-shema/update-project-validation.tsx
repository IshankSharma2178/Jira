import { z } from "zod";

export const updateProjectSchema = z.object({
  name: z.string().trim().min(1, "Minimum 1 character required.").optional(),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});
