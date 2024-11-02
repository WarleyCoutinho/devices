import { prisma } from "@/lib/prisma/prisma";

export const ServiceDeleteDevice = async (id: number) => {
  try {
    const ExistsDevice = await prisma.device.findUnique({
      where: { id },
    });

    if (!ExistsDevice) {
      throw new Error("Dispositivo não encontrado");
    }

    const DeleteDevice = await prisma.device.delete({
      where: { id },
    });

    return {
      message: "Dispositivo excluído com sucesso",
      deletedDevice: DeleteDevice,
    };
  } catch (error) {
    return {
      message: "Ocorreu um erro ao excluir a função",
    };
  }
};
