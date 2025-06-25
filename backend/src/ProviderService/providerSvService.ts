import { ProviderService } from "@prisma/client";
import HttpError from "../utils/HttpError";
import prisma from "../utils/prisma";
import { EditPService, NewPService } from "./providerSvSchema";

const providerSvService = {
    createService: async (
        providedServiceBody: NewPService,
        userId: string
    ): Promise<ProviderService> => {
        const providerInfo = await prisma.provider.findUnique({
            where: { userId: userId },
        });

        if (!providerInfo) throw new HttpError("Provider does not exists", 404);

        const newService = await prisma.providerService.create({
            data: {
                name: providedServiceBody.name,
                durationMin: providedServiceBody.durationMin,
                price: providedServiceBody.price,
                currency: providedServiceBody.currency,
                providerId: providerInfo.id,
            },
        });

        return newService;
    },
    getAllService: async () => {
        const allService = await prisma.providerService.findMany();

        return allService;
    },
    getServicesByProvider: async (
        providerId: string
    ): Promise<ProviderService[]> => {
        const providerInfo = await prisma.provider.findUnique({
            where: { id: providerId },
        });

        if (!providerInfo) throw new HttpError("Provider does not exists", 404);

        const servicesByProvider = await prisma.providerService.findMany({
            where: { providerId: providerInfo.id },
        });

        return servicesByProvider;
    },
    deleteService: async (
        serviceId: string,
        userId: string
    ): Promise<ProviderService> => {
        const providerInfo = await prisma.provider.findUnique({
            where: { userId: userId },
        });

        if (!providerInfo) throw new HttpError("Provider does not exists", 404);

        const serviceExists = await prisma.providerService.count({
            where: { id: serviceId, providerId: providerInfo.id },
        });

        if (!serviceExists) throw new HttpError("Service does not exists", 404);

        const deletedService = await prisma.providerService.delete({
            where: { id: serviceId, providerId: providerInfo.id },
        });

        return deletedService;
    },
    editService: async (
        serviceId: string,
        userId: string,
        providedServiceBody: EditPService
    ): Promise<ProviderService> => {
        const providerInfo = await prisma.provider.findUnique({
            where: { userId: userId },
        });

        if (!providerInfo) throw new HttpError("Provider does not exists", 404);

        const serviceExists = await prisma.providerService.count({
            where: { id: serviceId, providerId: providerInfo.id },
        });

        if (!serviceExists) throw new HttpError("Service does not exists", 404);

        const editedService = await prisma.providerService.update({
            where: { id: serviceId, providerId: providerInfo.id },
            data: {
                name: providedServiceBody.name,
                price: providedServiceBody.price,
                durationMin: providedServiceBody.durationMin,
                currency: providedServiceBody.currency,
            },
        });

        return editedService;
    },
};

export default providerSvService;
