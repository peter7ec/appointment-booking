import HttpError from "../utils/HttpError";
import prisma from "../utils/prisma";
import { EditAppointment, NewAppointment } from "./appointmentSchema";

const appointmentService = {
    getAllAppointment: async () => {
        const allAppointment = await prisma.appointment.findMany();

        return allAppointment;
    },
    getAppointmentsByProvider: async (providerId: string) => {
        const providerExists = await prisma.provider.count({
            where: { id: providerId },
        });

        if (!providerExists)
            throw new HttpError("Provider does not exists", 404);

        const providerAppointments = await prisma.appointment.findMany({
            where: { providerId: providerId },
        });

        return providerAppointments;
    },
    getAppointmentById: async (appointmentId: string) => {
        const appointmentById = await prisma.appointment.findUnique({
            where: { id: appointmentId },
        });

        if (!appointmentById)
            throw new HttpError("Appointment does not exists", 404);

        return appointmentById;
    },
    getAppointmentByClient: async (clientId: string) => {
        const appointmentByClianetId = await prisma.appointment.findMany({
            where: { clientId: clientId },
        });

        if (!appointmentByClianetId)
            throw new HttpError("There is no appointments", 404);

        return appointmentByClianetId;
    },
    editAppointment: async (
        appointmentId: string,
        providedBody: EditAppointment
    ) => {
        const appointmentExist = await prisma.appointment.count({
            where: { id: appointmentId },
        });

        if (!appointmentExist)
            throw new HttpError("Appointment does not exists", 404);

        const editedAppointment = await prisma.appointment.update({
            where: { id: appointmentId },
            data: {
                providerId: providedBody.providerId,
                startAt: providedBody.startAt,
                endsAt: providedBody.endsAt,
                serviceId: providedBody.serviceId,
            },
        });

        return editedAppointment;
    },
    deleteAppointment: async (appointmentId: string) => {
        const appointmentExist = await prisma.appointment.count({
            where: { id: appointmentId },
        });

        if (!appointmentExist)
            throw new HttpError("Appointment does not exists", 404);

        const deletedAppointment = await prisma.appointment.delete({
            where: { id: appointmentId },
        });

        return deletedAppointment;
    },
    createAppointment: async (
        clientId: string,
        providedBody: NewAppointment
    ) => {
        const providerExists = await prisma.provider.count({
            where: { id: providedBody.providerId },
        });

        if (!providerExists)
            throw new HttpError("Provider does not exists", 404);

        const isDayOff = await prisma.dayOff.count({
            where: {
                providerId: providedBody.providerId,
                startDate: { lte: providedBody.startAt },
                endDate: { gte: providedBody.endsAt },
            },
        });

        if (isDayOff) throw new HttpError("Not available time!", 409);

        const appointmentDate = new Date(providedBody.startAt);

        const dayOfWeek = appointmentDate.getDay();

        const workCycle = await prisma.workWeekCicle.findFirst({
            where: {
                providerId: providedBody.providerId,
                dayOfWeek: { has: dayOfWeek },
            },
        });

        if (!workCycle) throw new HttpError("Provider not working this day.");

        const datePart = appointmentDate.toISOString().split("T")[0];
        const workDayStart = new Date(
            `${datePart}T${workCycle.startTime}:00.000Z`
        );
        const workDayEnd = new Date(`${datePart}T${workCycle.endTime}:00.000Z`);

        if (
            providedBody.startAt < workDayStart ||
            providedBody.endsAt > workDayEnd
        )
            throw new HttpError("Out of work time.", 409);

        const isAppointed = await prisma.appointment.count({
            where: {
                providerId: providedBody.providerId,
                startAt: { lt: providedBody.endsAt },
                endsAt: { gt: providedBody.startAt },
            },
        });

        if (isAppointed) throw new HttpError("Not available time!", 409);

        const serviceExists = await prisma.providerService.count({
            where: { id: providedBody.serviceId },
        });

        if (!serviceExists) throw new HttpError("Service does not exists", 404);

        const newAppointment = await prisma.appointment.create({
            data: {
                clientId: clientId,
                providerId: providedBody.providerId,
                startAt: providedBody.startAt,
                endsAt: providedBody.endsAt,
                serviceId: providedBody.serviceId,
            },
        });

        return newAppointment;
    },
};

export default appointmentService;
