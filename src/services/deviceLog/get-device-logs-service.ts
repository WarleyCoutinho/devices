import { prisma } from "@/lib/prisma/prisma";
import { BadRequestError } from "@/routes/_errors/bad-request-error";

export const ServiceGetDevicesLogs = async () => {
  try {
    const ExistsDevicesLogs = await prisma.deviceLog.findMany({
      select: {
        id: true,
        status: true,
        timestamp: true,
        deviceId: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    if (!ExistsDevicesLogs || ExistsDevicesLogs.length === 0) {
      throw new Error("Nenhum log do dispositivo encontrado");
    }

    return ExistsDevicesLogs;
  } catch (error) {
    console.error("Erro ao buscar os logs do dispositivos:", error);
    error instanceof BadRequestError;
  }
};
