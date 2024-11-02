import { z } from "zod";
import { FastifyInstance, FastifyRequest } from "fastify";

import { ZodTypeProvider } from "fastify-type-provider-zod";
import { deviceSchema } from "@/schemas/deviceSchemas/DeviceSchemas";
import { ServiceUpdateDevice } from "@/services/device/device-update-service";

type DeviceSchema = z.infer<typeof deviceSchema>;

export const UpdateDeviceController = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/devices/:id",
    {
      schema: {
        tags: ["devices"],
        summary: "Atualizar um dispositivo",
        description: "Atualiza um dispositivo",
        params: z.object({
          id: z.coerce.number(),
        }),
        body: deviceSchema,
      },
    },
    async (
      request: FastifyRequest<{ Params: { id: number }; Body: DeviceSchema }>,
      reply
    ) => {
      const { id } = request.params;
      const data = request.body;

      try {
        const Device = await ServiceUpdateDevice(id, data);
        reply.status(200).send(Device);
      } catch (error) {
        reply.status(400).send({ message: "Error ao atualizar dispositivo." });
      }
    }
  );
};
