import { Hono } from "hono";
import { zValidator } from "@/features/middleware/validation.middleware";
import { workSpaceSchema } from "@/validation/workspace-schema/workspace-validation";
import { sessionMiddleware } from "@/features/middleware/session.middleware";
import { DATABASE_ID, IMAGES_BUCKET_ID, WORKSPACES_ID } from "@/config";
import { ID } from "node-appwrite";

const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_ID
    );
    return c.json({ data: workspaces });
  })
  .post(
    "/",
    zValidator("form", workSpaceSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases");
      const storage = c.get("storage");
      const user = c.get("user");
      const { name, image } = await c.req.valid("form");

      let uploadImageUploadUrl: string | undefined;

      if (image instanceof File) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          image
        );

        const arrayBuffer = await storage.getFilePreview(
          IMAGES_BUCKET_ID,
          file.$id
        );
        uploadImageUploadUrl = `data:image/png;base64,${Buffer.from(
          arrayBuffer
        ).toString("base64")}`;
      }

      const workspace = await databases.createDocument(
        DATABASE_ID,
        WORKSPACES_ID,
        ID.unique(),
        { name, userId: user.$id, imageUrl: uploadImageUploadUrl }
      );
      return c.json({ data: workspace });
    }
  );

export default app;
