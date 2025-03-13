"use client";
import React from "react";
import CreateWorkspaceForm from "./create-workspace-form";
import { ResponsiveModal } from "@/components/responsive-modal";
import { useCreateWorkspaceModal } from "../hooks/use-create-workspace-modal";

const CreateWorkspaceModal = () => {
  const { isOpen, setIsOpen } = useCreateWorkspaceModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateWorkspaceForm />
    </ResponsiveModal>
  );
};

export default CreateWorkspaceModal;
