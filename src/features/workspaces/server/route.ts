import { Hono } from "hono";
import { zValidator } from "@/features/middleware/validation.middleware";
import { workSpaceSchema } from "@/validation/workspace-schema/workspace-validation";
import { sessionMiddleware } from "@/features/middleware/session.middleware";
import { DATABASE_ID, WORKSPACES_ID } from "@/config";
import { ID } from "node-appwrite";

const app = new Hono().post(
  "/",
  zValidator("json", workSpaceSchema),
  sessionMiddleware,
  async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");
    const { name } = await c.req.valid("json");
    const workspace = await databases.createDocument(
      DATABASE_ID,
      WORKSPACES_ID,
      ID.unique(),
      { name, userId: user.$id }
    );
    return c.json({ data: workspace });
  }
);

export default app;
