import "server-only";

import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { AUTH_COOKIE } from "../auth/constant";

import {
  Account,
  Client,
  Databases,
  Models,
  Storage,
  type Account as AccountType,
  type Databases as DatabaseType,
  type Storage as StorageType,
  type Users as UserType,
} from "node-appwrite";

type SessionContext = {
  Variables: {
    account: AccountType;
    databases: DatabaseType;
    storage: StorageType;
    users: UserType;
    user: Models.User<Models.Preferences>;
  };
};

export const sessionMiddleware = createMiddleware<SessionContext>(
  async (c, next) => {
    if (
      process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT === undefined ||
      process.env.NEXT_PUBLIC_APPWRITE_PROJECT === undefined
    ) {
      throw new Error("endpoint is not defined");
    }

    const client = new Client()
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT);

    const session = getCookie(c, AUTH_COOKIE);

    if (!session) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    client.setSession(session);

    const account = new Account(client);
    const databases = new Databases(client);
    const storage = new Storage(client);
    const user = await account.get();

    c.set("account", account);
    c.set("databases", databases);
    c.set("storage", storage);
    c.set("user", user);

    await next();
  }
);
