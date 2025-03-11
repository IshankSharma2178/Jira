import { protect } from "@/features/auth/actions";
import CreateWorkspaceForm from "@/features/workspaces/component/create-workspace-form";
import { redirect } from "next/navigation";
export default async function Home() {
  const user = await protect();
  if (!user) redirect("/sign-in");

  return (
    <div>
      <CreateWorkspaceForm />
    </div>
  );
}
