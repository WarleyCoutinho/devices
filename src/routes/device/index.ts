import { FastifyInstance } from "fastify";
import { GetDeviceByIdController } from "@/controllers/device/by-id-device-controller";
import { CreateDeviceController } from "@/controllers/device/device-creation-controller";
import { DeleteDeviceController } from "@/controllers/device/device-delete-controller";
import { UpdateDeviceController } from "@/controllers/device/device-update-controller";
import { GetDeviceController } from "@/controllers/device/get-device-controller";

export const deviceRoutes = (app: FastifyInstance) => {
  CreateDeviceController(app);
  GetDeviceController(app);
  GetDeviceByIdController(app);
  UpdateDeviceController(app);
  DeleteDeviceController(app);
};
