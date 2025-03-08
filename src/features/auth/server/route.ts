import { signInSchema } from "@/validation/auth/sign-in-validation";
import { zValidator } from "@/validation/validation.middleware";
import { Hono } from "hono";

const app = new Hono().post("/login", zValidator("json", signInSchema), (c) => {
  return c.json({ success: "true" });
});

export default app;
