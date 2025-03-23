import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { CreateTaskModal } from "@/features/tasks/components/create-task-modal";
import CreateWorkspaceModal from "@/features/workspaces/component/create-workspace-modal";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen">
      <CreateWorkspaceModal />
      <CreateTaskModal />
      <div className="flex w-full h-full">
        <div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full">
          <Sidebar />
        </div>
        <div className="lg:pl-[264px] w-full">
          <div className="mx-auto max-w-screen-2xl h-full">
            <Navbar />

            <main className="h-full py-8 px-6 flex flex-col">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
