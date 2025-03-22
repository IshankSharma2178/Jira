import { TaskStatus } from "@/features/tasks/components/types";
import { z } from "zod";

export const getTaskSchema = z.object({
  workspaceId: z.string(),
  projectId: z.string().nullish(),
  dueDate: z.string().nullish(),
  status: z.nativeEnum(TaskStatus).nullish(),
  search: z.string().nullish(),
  assigneeId: z.string().nullish(),
});
