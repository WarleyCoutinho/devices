import { FastifyInstance } from "fastify";
import { CreateDeviceLogController } from "@/controllers/deviceLog/device-log-creation-controller";
import { GetDeviceLogsController } from "@/controllers/deviceLog/get-device-logs-controller";
import { GetDeviceLogByIdController } from "@/controllers/deviceLog/by-id-device-log-controller";

export const deviceLogRoutes = (app: FastifyInstance) => {
  CreateDeviceLogController(app);
  GetDeviceLogsController(app);
  GetDeviceLogByIdController(app);
};
