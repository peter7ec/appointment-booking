import HttpError from "../utils/HttpError";
import prisma from "../utils/prisma";

const providerService = {
    getAllProvider: async () => {
        const allProvider = await prisma.provider.findMany({
            select: {
                id: true,
                userId: true,
                user: {
                    select: { name: true, email: true, phoneNumber: true },
                },
            },
        });

        return allProvider;
    },
    getProviderById: async (providerId: string) => {
        const provider = await prisma.provider.findUnique({
            where: { id: providerId },
            select: {
                id: true,
                userId: true,
                user: {
                    select: { name: true, email: true, phoneNumber: true },
                },
            },
        });

        if (!provider) throw new HttpError("Provider does not exists", 404);

        return provider;
    },
    createProvider: async (userId: string) => {
        const userExist = await prisma.user.count({ where: { id: userId } });

        if (!userExist) throw new HttpError("User does not exists", 404);

        const newProvider = await prisma.provider.create({
            data: { userId: userId },
        });

        await prisma.user.update({
            where: { id: userId },
            data: { role: "PROVIDER" },
        });

        return newProvider;
    },
    deleteProvider: async (providerId: string) => {
        const provider = await prisma.provider.findUnique({
            where: { id: providerId },
        });

        if (!provider) throw new HttpError("Provider does not exists", 404);

        await prisma.workWeekCicle.deleteMany({
            where: { providerId: providerId },
        });

        await prisma.dayOff.deleteMany({ where: { providerId: providerId } });

        await prisma.appointment.deleteMany({
            where: { providerId: providerId },
        });

        await prisma.providerService.deleteMany({
            where: { providerId: providerId },
        });

        await prisma.user.update({
            where: { id: provider.userId },
            data: { role: "CLIENT" },
        });

        const deletedProvider = await prisma.provider.delete({
            where: { id: providerId },
        });

        return deletedProvider;
    },
};

export default providerService;
