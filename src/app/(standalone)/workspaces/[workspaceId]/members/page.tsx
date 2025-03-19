import { redirect } from "next/navigation";

import { MembersList } from "@/features/workspaces/component/member-list";
import { getUser } from "@/features/auth/api/get-user";

const WorkspaceIdMembersPage = async () => {
  const user = await getUser();

  if (!user) redirect("/sign-in");

  return (
    <div className="w-full lg:max-w-xl">
      <MembersList />
    </div>
  );
};

export default WorkspaceIdMembersPage;
