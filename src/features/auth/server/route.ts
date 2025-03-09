import { Hono } from "hono";
import { createAdminClient } from "@/lib/appwrite";
import { signInSchema } from "@/validation/auth/sign-in-validation";
import { signUpSchema } from "@/validation/auth/sign-up-validation";
import { zValidator } from "@/validation/validation.middleware";
import { ID } from "node-appwrite";
import { setCookie, deleteCookie } from "hono/cookie";
import { AUTH_COOKIE } from "../constant";

const app = new Hono()
  .post("/login", zValidator("json", signInSchema), async (c) => {
    const { email, password } = await c.req.valid("json");
    console.log("first");

    const { account } = await createAdminClient();
    console.log("second");

    const session = await account.createEmailPasswordSession(email, password);
    console.log("third");

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

  .post("/logout", async (c) => {
    deleteCookie(c, AUTH_COOKIE);
    return c.json({ success: true });
  });

export default app;
