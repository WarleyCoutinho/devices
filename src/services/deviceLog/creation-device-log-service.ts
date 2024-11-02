import { prisma } from "@/lib/prisma/prisma";
import { BadRequestError } from "@/routes/_errors/bad-request-error";

export const ServiceCreationDeviceLog = async (
  deviceId: number,
  status: string
) => {
  try {
    // Verifica se o dispositivo existe antes de registrar o log
    const deviceExists = await prisma.device.findUnique({
      where: {
        id: deviceId,
      },
    });

    if (!deviceExists) {
      throw new BadRequestError("O dispositivo não existe.");
    }

    // Cria o log do dispositivo
    return await prisma.deviceLog.create({
      data: {
        deviceId,
        status,
      },
    });
  } catch (error) {
    console.error("Error creating deviceLog:", error);
    error instanceof BadRequestError; // Lança o erro apropriado
  }
};
