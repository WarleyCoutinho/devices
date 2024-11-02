import { z } from "zod";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { ServiceGetDeviceLogById } from "@/services/deviceLog/by-id-device-log-service";
import { deviceLogsSchena } from "@/schemas/deviceLogSchemas/DeviceLogSckemas";

type DeviceLogByIdSchema = z.infer<typeof deviceLogsSchena>;

export const GetDeviceLogByIdController = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/devices/:deviceId/logs",
    {
      schema: {
        tags: ["devicesLogs"],
        summary: "Obter um log do dispositivo e por ID",
        description: "Obtém um log do dispositivo por ID",
        params: z.object({
          deviceId: z.coerce.number(), // Corrigido para 'deviceId'
        }),

        response: {
          //200: deviceLogsSchena,
          400: z.object({
            message: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (
      request: FastifyRequest<{ Params: DeviceLogByIdSchema }>,
      reply: FastifyReply
    ) => {
      const deviceId = request.params.deviceId; // Acessando deviceId diretamente

      if (isNaN(deviceId)) {
        return reply.status(400).send({ message: "Invalid device ID" });
      }

      try {
        const deviceLog = await ServiceGetDeviceLogById(deviceId);
        if (!deviceLog) {
          return reply
            .status(404)
            .send({ message: "Log do dispositivo não encontrado" });
        }
        return reply.status(200).send(deviceLog);
      } catch (error) {
        console.error("Error fetching device log:", error); // Log do erro para depuração
        return reply.status(500).send({ message: "Erro com API" }); // Retornar erro 500 em caso de falha no serviço
      } finally {
        console.log("GetDeviceLogByIdController finalized");
      }
    }
  );
};
