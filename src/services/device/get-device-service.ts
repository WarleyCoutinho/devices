import { prisma } from "@/lib/prisma/prisma";
import { BadRequestError } from "@/routes/_errors/bad-request-error";

export const ServiceGetDevices = async () => {
  try {
    const ExistsDevices = await prisma.device.findMany({
      select: {
        id: true,
        name: true,
        ipAddress: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    if (!ExistsDevices || ExistsDevices.length === 0) {
      throw new Error("Nenhum dispositivo encontrado");
    }

    return ExistsDevices;
  } catch (error) {
    console.error("Erro ao buscar dispositivos:", error);
    error instanceof BadRequestError;
  }
};
