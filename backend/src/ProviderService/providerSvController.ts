import { NextFunction, Request, Response } from "express";
import { AuthorizedRequest } from "../middlewares/authorize";
import { ApiResponse } from "../types/global";
import { ProviderService } from "@prisma/client";
import providerSvService from "./providerSvService";
import { EditPService } from "./providerSvSchema";

const providerSvController = {
    getAllService: async (
        req: Request,
        res: Response<ApiResponse<ProviderService[]>>,
        next: NextFunction
    ) => {
        try {
            const allService = await providerSvService.getAllService();
            res.json({
                ok: true,
                message: "All Service",
                data: allService,
            });
        } catch (error) {
            next(error);
        }
    },
    getServiceByProviderId: async (
        req: AuthorizedRequest,
        res: Response<ApiResponse<ProviderService[]>>,
        next: NextFunction
    ) => {
        try {
            const serviceByProvider =
                await providerSvService.getServicesByProvider(
                    req.params.providerId
                );

            res.json({
                ok: true,
                message: "All Service by provider",
                data: serviceByProvider,
            });
        } catch (error) {
            next(error);
        }
    },
    deleteService: async (
        req: AuthorizedRequest,
        res: Response<ApiResponse<ProviderService>>,
        next: NextFunction
    ) => {
        try {
            const deletedService = await providerSvService.deleteService(
                req.params.serviceId,
                req.user!.id
            );
            res.json({
                ok: true,
                message: "Service deleted!",
                data: deletedService,
            });
        } catch (error) {
            next(error);
        }
    },
    editService: async (
        req: AuthorizedRequest,
        res: Response<ApiResponse<ProviderService>>,
        next: NextFunction
    ) => {
        try {
            const editedService = await providerSvService.editService(
                req.params.serviceId,
                req.user!.id,
                req.body
            );
            res.json({
                ok: true,
                message: "Service edited!",
                data: editedService,
            });
        } catch (error) {
            next(error);
        }
    },
    createService: async (
        req: AuthorizedRequest,
        res: Response<ApiResponse<ProviderService>>,
        next: NextFunction
    ) => {
        try {
            const newService = await providerSvService.createService(
                req.body,
                req.user!.id
            );
            res.json({
                ok: true,
                message: "Service created!",
                data: newService,
            });
        } catch (error) {
            next(error);
        }
    },
};

export default providerSvController;
