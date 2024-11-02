import { prisma } from "@/lib/prisma/prisma";
import { BadRequestError } from "@/routes/_errors/bad-request-error";

export const ServiceCreationDevice = async (
  name: string,
  ipAddress: string
) => {
  try {
    const DeviceWithSameName = await prisma.device.findUnique({
      where: {
        ipAddress,
      },
    });

    if (DeviceWithSameName) {
      throw new Error("O Ip already in use");
    }

    return await prisma.device.create({
      data: {
        name,
        ipAddress,
      },
    });
  } catch (error) {
    console.error("Error creating device:", error);
    error instanceof BadRequestError;
  }
};
