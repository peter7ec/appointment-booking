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
