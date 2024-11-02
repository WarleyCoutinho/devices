import { z } from "zod";
import { FastifyInstance, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { ServiceDeleteDevice } from "@/services/device/device-delete-service";

export const DeleteDeviceController = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/devices/:id",
    {
      schema: {
        tags: ["devices"],
        summary: "Excluir um dispositivo",
        description: "Exclui um dispositivo",
        params: z.object({
          id: z.coerce.number(),
        }),
      },
    },
    async (request: FastifyRequest<{ Params: { id: number } }>, reply) => {
      const { id } = request.params;

      try {
        const deviceResponse = await ServiceDeleteDevice(id);

        // Se a mensagem for de "Dispositivo não encontrado", retorna 404
        if (deviceResponse.message === "Dispositivo não encontrado") {
          reply.status(404).send({ message: deviceResponse.message });
        } else {
          // Caso contrário, retorna 200 com o dispositivo excluído
          reply.status(200).send({
            message: deviceResponse.message,
            deletedDevice: deviceResponse.deletedDevice,
          });
        }
      } catch (error) {
        console.error("Erro ao excluir dispositivo:", error); // Log do erro para monitoramento
        reply.status(500).send({ message: "Erro ao excluir o dispositivo." });
      }
    }
  );
};
