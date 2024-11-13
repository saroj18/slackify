import z from "zod";

export const WorkSpaceZodSchema = z.object({
  workspaceName: z.string().min(5).max(50),
  creatorName: z.string().min(5).max(50),
  users: z.string().min(5).max(50),
  projectName: z.string().min(5).max(50),
});
