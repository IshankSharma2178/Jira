import { Hono } from "hono";
import { createAdminClient } from "@/lib/appwrite";
import { signInSchema } from "@/validation/auth/sign-in-validation";
import { signUpSchema } from "@/validation/auth/sign-up-validation";
import { zValidator } from "@/features/middleware/validation.middleware";
import { ID } from "node-appwrite";
import { setCookie, deleteCookie } from "hono/cookie";
import { AUTH_COOKIE } from "../constant";
import { sessionMiddleware } from "@/features/middleware/session.middleware";

const app = new Hono()
  .get("/current", sessionMiddleware, (c) => {
    const user = c.get("user");

    return c.json(user);
  })
  .post("/login", zValidator("json", signInSchema), async (c) => {
    const { email, password } = await c.req.valid("json");
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);
    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 15,
    });

    return c.json({ success: true });
  })
  .post("/register", zValidator("json", signUpSchema), async (c) => {
    const { name, email, password } = await c.req.valid("json");

    const { account } = await createAdminClient();
    await account.create(ID.unique(), email, password, name);

    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 15,
    });

    return c.json({ success: true });
  })

  .post("/logout", sessionMiddleware, async (c) => {
    const account = c.get("account");

    deleteCookie(c, AUTH_COOKIE);
    await account.deleteSession("current");
    return c.json({ success: true });
  });

export default app;
