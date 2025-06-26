import { WorkWeekCicle } from "@prisma/client";
import HttpError from "../utils/HttpError";
import prisma from "../utils/prisma";
import { OneDayWorkTime } from "./workWeekCicleTypes";
import { EditWorkWeekCicle, NewWorkWeekCicle } from "./workWeekCicleSchema";

const workWeekCicleService = {
    getAllWorkTimeForDay: async (
        providerId: string,
        targetDateString: string
    ): Promise<OneDayWorkTime> => {
        const targetDate = new Date(targetDateString);

        targetDate.setUTCHours(0, 0, 0, 0);
        const dayOfWeek = targetDate.getDay();

        const isDayOff = await prisma.dayOff.count({
            where: {
                providerId: providerId,
                startDate: { lte: targetDate },
                endDate: { gte: targetDate },
            },
        });

        if (isDayOff) throw new HttpError("No working day", 409);

        const workCycle = await prisma.workWeekCicle.findFirst({
            where: {
                providerId: providerId,
                dayOfWeek: {
                    has: dayOfWeek,
                },
            },
        });

        if (!workCycle) {
            throw new HttpError("No working day", 404);
        }

        const datePart = targetDate.toISOString().split("T")[0];

        const startDateTime = new Date(
            `${datePart}T${workCycle.startTime}:00.000Z`
        );
        const endDateTime = new Date(
            `${datePart}T${workCycle.endTime}:00.000Z`
        );

        return {
            providerId: workCycle.providerId,
            start: startDateTime.toISOString(),
            end: endDateTime.toISOString(),
        };
    },
    getWorkTimeById: async (providerId: string) => {
        const workTime = await prisma.workWeekCicle.findFirst({
            where: { providerId: providerId },
        });
        if (!workTime)
            throw new HttpError("This provider dont have work cicle");

        return workTime;
    },
    createWorkTime: async (providedBody: NewWorkWeekCicle) => {
        const newWorkCice = await prisma.workWeekCicle.create({
            data: {
                providerId: providedBody.providerId,
                dayOfWeek: providedBody.dayOfWeek,
                startTime: providedBody.startTime,
                endTime: providedBody.endTime,
            },
        });

        return newWorkCice;
    },
    editWorkTime: async (
        workCicleId: string,
        providedBody: EditWorkWeekCicle
    ) => {
        const cicleExists = await prisma.workWeekCicle.count({
            where: { id: workCicleId },
        });

        if (!cicleExists) throw new HttpError("Cicle does not exists", 404);

        const editedCicle = await prisma.workWeekCicle.update({
            where: { id: workCicleId },
            data: {
                dayOfWeek: providedBody.dayOfWeek,
                startTime: providedBody.startTime,
                endTime: providedBody.endTime,
            },
        });

        return editedCicle;
    },
    deleteWorkTime: async (workCicleId: string) => {
        const cicleExists = await prisma.workWeekCicle.count({
            where: { id: workCicleId },
        });

        if (!cicleExists) throw new HttpError("Cicle does not exists", 404);

        const deletedCicle = await prisma.workWeekCicle.delete({
            where: { id: workCicleId },
        });

        return deletedCicle;
    },
};

export default workWeekCicleService;
