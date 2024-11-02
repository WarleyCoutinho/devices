import { z } from "zod";
import { FastifyInstance } from "fastify";

import { ZodTypeProvider } from "fastify-type-provider-zod";
import { deviceByIdSchema } from "@/schemas/deviceSchemas/DeviceSchemas";
import { ServiceGetDevices } from "@/services/device/get-device-service";

export const GetDeviceController = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/devices",
    {
      schema: {
        tags: ["devices"],
        summary: "Obter todos os dispositivos",
        description: "Obtém todos os dispositivos",
        response: {
          200: z.array(deviceByIdSchema),
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
        const Devices = await ServiceGetDevices();
        if (!Devices || Devices.length === 0) {
          return reply
            .status(404)
            .send({ message: "Nenhum dispositivo encontrado" });
        }
        return reply.status(200).send(Devices);
      } catch (error) {
        return reply.status(400).send({
          message: error instanceof Error ? error.message : "Erro desconhecido",
        });
      }
    }
  );
};
