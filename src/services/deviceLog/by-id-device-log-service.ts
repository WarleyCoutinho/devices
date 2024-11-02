import { prisma } from "@/lib/prisma/prisma";

export const ServiceGetDeviceLogById = async (deviceId: number) => {
  try {
    const deviceLogs = await prisma.deviceLog.findMany({
      where: { deviceId },

      select: {
        id: true,
        status: true,
        timestamp: true,
        deviceId: true,
        device: {
          select: {
            id: true,
            name: true,
            ipAddress: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    return deviceLogs;
  } catch (error) {
    console.error("Erro ao buscar o log do dispositivo:", error);
    throw new Error(
      "Erro ao buscar o log do dispositivo. Tente novamente mais tarde."
    );
  }
};
