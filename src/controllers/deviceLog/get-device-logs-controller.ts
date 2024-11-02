import { z } from "zod";
import { FastifyInstance } from "fastify";

import { ZodTypeProvider } from "fastify-type-provider-zod";
import { deviceLogByIdSchema } from "@/schemas/deviceLogSchemas/DeviceLogSckemas";
import { ServiceGetDevicesLogs } from "@/services/deviceLog/get-device-logs-service";

export const GetDeviceLogsController = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/devices-logs",
    {
      schema: {
        tags: ["devicesLogs"],
        summary: "Obter todos os logs dos dispositivos",
        description: "Obtém todos os logs dos dispositivos",
        response: {
          200: z.array(deviceLogByIdSchema),
          400: z.object({
            message: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (_, reply) => {
      try {
        const DevicesLogs = await ServiceGetDevicesLogs();
        if (!DevicesLogs || DevicesLogs.length === 0) {
          return reply
            .status(404)
            .send({ message: "Nenhum log dos dispositivos encontrado" });
        }
        return reply.status(200).send(DevicesLogs);
      } catch (error) {
        return reply.status(400).send({
          message: error instanceof Error ? error.message : "Erro desconhecido",
        });
      }
    }
  );
};
