import { z } from "zod";
import { FastifyInstance, FastifyRequest } from "fastify";

import { ZodTypeProvider } from "fastify-type-provider-zod";
import { deviceByIdSchema } from "@/schemas/deviceSchemas/DeviceSchemas";
import { ServiceGetDeviceById } from "@/services/device/by-id-device-service";

type DeviceSchema = z.infer<typeof deviceByIdSchema>;

export const GetDeviceByIdController = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/devices/:id",
    {
      schema: {
        tags: ["devices"],
        summary: "Obter um dispositivo por ID",
        description: "Obtém um dispositivo por ID",
        params: z.object({
          id: z.coerce.number(),
        }),

        response: {
          200: deviceByIdSchema,
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
    async (request: FastifyRequest<{ Params: DeviceSchema }>, reply) => {
      const { id } = request.params;

      try {
        const Device = await ServiceGetDeviceById(id);
        if (!Device) {
          reply.status(404).send({ message: "Função não encontrada" });
        } else {
          reply.status(200).send(Device);
        }
      } catch (error) {
        return reply.status(400).send({ error: "Invalid device ID" });
      } finally {
        console.log("GetDeviceByIdController finalized");
        reply.status(500).send({ message: "Erro com API" });
      }
    }
  );
};
