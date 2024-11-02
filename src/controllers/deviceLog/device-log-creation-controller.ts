import { z } from "zod";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { deviceLogSchema } from "@/schemas/deviceLogSchemas/DeviceLogSckemas";
import { ServiceCreationDeviceLog } from "@/services/deviceLog/creation-device-log-service";

type DeviceLogSchema = z.infer<typeof deviceLogSchema>;

export const CreateDeviceLogController = (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    // .register(Auth)
    .post(
      "/devices/:deviceId/logs",
      {
        schema: {
          tags: ["devicesLogs"],
          summary: "Crie um novo log do dispositivo",
          description: "Cria um novo log do dispositivo",
          //security: [{ bearerAuth: [] }],
          body: deviceLogSchema,
          response: {
            201: deviceLogSchema,
            400: z.object({
              message: z.string(),
            }),
            404: z.object({
              message: z.string(),
            }),
            500: z.object({
              error: z.string(),
            }),
          },
        },
      },
      async (request: FastifyRequest, reply: FastifyReply) => {
        // Validação do corpo da requisição
        const parsed = deviceLogSchema.safeParse(request.body);
        if (!parsed.success) {
          return reply.status(400).send(parsed.error.format());
        }

        const { deviceId, status }: DeviceLogSchema = parsed.data;

        try {
          const newDeviceLog = await ServiceCreationDeviceLog(deviceId, status);
          return reply.status(201).send(newDeviceLog);
        } catch (error) {
          console.error("Error creating deviceLog:", error);
          return reply.status(500).send({ error: "Internal server error" });
        }
      }
    );
};
