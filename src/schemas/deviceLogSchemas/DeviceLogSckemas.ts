import { z } from "zod";

export const deviceLogSchema = z.object({
  deviceId: z.coerce.number().int(),
  status: z.string().min(1, "Status is required"),
});

export const deviceLogByIdSchema = z.object({
  deviceId: z.coerce.number().int(),
  status: z.string().min(1, "Status is required"),
  timestamp: z.coerce.date().optional(),
});

export const deviceLogsSchena = z.object({
  id: z.coerce.number().int(),
  status: z.string().min(1, "Status is required"),
  timestamp: z.coerce.date(),
  deviceId: z.coerce.number().int(),
  device: z.object({
    id: z.coerce.number().int(),
    name: z.string().min(1, "Name is required"),
    ipAddress: z.string().ip("Invalid IP address"),
  }),
});
