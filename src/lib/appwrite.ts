import "server-only";

import { Client, Account, Storage, Users, Databases } from "node-appwrite";

export async function createAdminClient() {
  if (
    process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT === undefined ||
    process.env.NEXT_APPWRITE_KEY === undefined ||
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT === undefined
  ) {
    throw new Error("endpoint is not defined");
  }

  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
    .setKey(process.env.NEXT_APPWRITE_KEY);

  return {
    get account() {
      return new Account(client);
    },
  };
}
