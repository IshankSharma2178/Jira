"use client";
import { ResponsiveModal } from "../../../components/responsive-modal";
import { useCreateTaskModal } from "../hooks/use-create-project-modal";
import { CreateTaskFormWrapper } from "./create-task-modal-wrapper";

export const CreateTaskModal = () => {
  const { isOpen, setIsOpen, close } = useCreateTaskModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateTaskFormWrapper onCancel={close} />
    </ResponsiveModal>
  );
};
