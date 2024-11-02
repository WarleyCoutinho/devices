import { z } from "zod";

export const deviceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  ipAddress: z.string().ip("Invalid IP address"),
});

export const deviceByIdSchema = z.object({
  id: z.number().min(1, "ID is required"),
  name: z.string().min(1, "Name is required"),
  ipAddress: z.string().ip("Invalid IP address"),
});
