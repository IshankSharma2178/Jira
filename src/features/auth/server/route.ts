import { signInSchema } from "@/validation/auth/sign-in-validation";
import { signUpSchema } from "@/validation/auth/sign-up-validation";
import { zValidator } from "@/validation/validation.middleware";
import { Hono } from "hono";

const app = new Hono()
  .post("/login", zValidator("json", signInSchema), async (c) => {
    const { email, password } = await c.req.valid("json");
    console.log(email);
    console.log(password);
    return c.json({ success: "true" });
  })
  .post("/register", zValidator("json", signUpSchema), async (c) => {
    const { name, email, password } = await c.req.valid("json");
    console.log(name, email, password);
    return c.json({ success: "true" });
  });

export default app;
