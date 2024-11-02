import { prisma } from "@/lib/prisma/prisma";

export const ServiceUpdateDevice = async (
  id: number,
  data: { name?: string; description?: string }
) => {
  try {
    const UpdateDevice = await prisma.device.update({
      where: { id },
      data,
    });

    return UpdateDevice;
  } catch (error) {
    console.error("Erro ao atualizar dispositivo:", error);
    // if (error.code === "P2025") {
    //   throw new Error("Dispositivo não encontrado");
    // }
    throw new Error(
      "Erro ao atualizar dispositivo. Tente novamente mais tarde."
    );
  }
};
