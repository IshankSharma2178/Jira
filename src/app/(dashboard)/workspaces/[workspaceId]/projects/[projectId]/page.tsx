import { redirect } from "next/navigation";

import { getUser } from "@/features/auth/api/get-user";

import { ProjectIdClient } from "./client";

const ProjectIdPage = async () => {
  const user = await getUser();

  if (!user) redirect("/sign-in");

  return <ProjectIdClient />;
};

export default ProjectIdPage;
