import { getUser } from "@/features/auth/api/get-user";
import { redirect } from "next/navigation";

const WorkspaceIdpage = async () => {
  const user = await getUser();
  if (!user) redirect("/sign-in");

  return <div>page</div>;
};

export default WorkspaceIdpage;
