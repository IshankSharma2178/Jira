import { Models } from "node-appwrite";

export enum TaskStatus {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
  IN_REVIEW = "IN_REVIEW",
}

export type Task = Models.Document & {
  name: string;
  status: TaskStatus;
  projectId: string;
  assigneeId: string;
  dueDate: string;
  position: number;
};
