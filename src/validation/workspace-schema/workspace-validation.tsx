import { z } from "zod";

export const workSpaceSchema = z.object({
  name: z.string().trim().min(1, "Required"),
});
