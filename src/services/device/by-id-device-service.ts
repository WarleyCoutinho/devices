import { prisma } from "@/lib/prisma/prisma";

export const ServiceGetDeviceById = async (id: number) => {
  try {
    const ExistsDevice = await prisma.device.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        ipAddress: true,
      },
    });

    if (!ExistsDevice) {
      throw new Error("Dispositivo não encontrado");
    }

    return ExistsDevice;
  } catch (error) {
    console.error("Erro ao buscar dispositivo:", error);
    throw new Error("Erro ao buscar dispositivo. Tente novamente mais tarde.");
  }
};
