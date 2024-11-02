import { z } from "zod";
import { FastifyInstance } from "fastify";

import { ZodTypeProvider } from "fastify-type-provider-zod";
import { deviceSchema } from "@/schemas/deviceSchemas/DeviceSchemas";
import { ServiceCreationDevice } from "@/services/device/creation-device-service";

type DeviceSchema = z.infer<typeof deviceSchema>;

export const CreateDeviceController = (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    // .register(Auth)
    .post(
      "/devices",
      {
        schema: {
          tags: ["devices"],
          summary: "Crie um novo dispositivo",
          description: "Cria um novo dispositivo",
          //security: [{ bearerAuth: [] }],
          body: deviceSchema,
          response: {
            201: deviceSchema,
            200: z.array(deviceSchema),
            400: z.object({
              message: z.string(),
            }),
            404: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { name, ipAddress }: DeviceSchema = request.body;

        try {
          const NewDevice = await ServiceCreationDevice(name, ipAddress);
          reply.status(201).send(NewDevice);
        } catch (error) {
          reply.status(400).send({ message: "Error creating device" });
          console.error("Error creating device:", error);
        }
      }
    );
};
