import { DayOff } from "@prisma/client";
import HttpError from "../utils/HttpError";
import { NewDayOff } from "./dayOffSchema";
import prisma from "../utils/prisma";

const dayOffService = {
    createDayOff: async (
        userId: string,
        requestDayOff: NewDayOff
    ): Promise<DayOff> => {
        const providerInfo = await prisma.provider.findUnique({
            where: { userId: userId },
        });

        if (!providerInfo)
            throw new HttpError("Provider does not exists!", 404);

        const createdDayOff = await prisma.dayOff.create({
            data: {
                providerId: providerInfo.id,
                startDate: requestDayOff.startDate,
                endDate: requestDayOff.endDate,
                reason: requestDayOff.reason,
            },
        });

        return createdDayOff;
    },
    listDayOff: async (userId: string) => {
        const providerInfo = await prisma.provider.findUnique({
            where: { userId: userId },
        });

        if (!providerInfo)
            throw new HttpError("Provider does not exists!", 404);

        const dayOffs = await prisma.dayOff.findMany({
            where: { providerId: providerInfo.id },
        });

        return dayOffs;
    },
    deleteDayOff: async (userId: string, dayOffId: string) => {
        const providerInfo = await prisma.provider.findUnique({
            where: { userId: userId },
        });

        if (!providerInfo)
            throw new HttpError("Provider does not exists!", 404);

        const dayOffExists = await prisma.dayOff.count({
            where: { id: dayOffId, providerId: providerInfo.id },
        });

        if (!dayOffExists) throw new HttpError("Day off does not exists!", 404);

        const deletedDayOff = await prisma.dayOff.delete({
            where: { id: dayOffId, providerId: providerInfo.id },
        });

        return deletedDayOff;
    },
};

export default dayOffService;
