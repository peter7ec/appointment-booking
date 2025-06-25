import { NextFunction, Request, Response } from "express";
import providerService from "./providerService";
import { ApiResponse } from "../types/global";
import { Provider } from "@prisma/client";

const providerController = {
    allProvider: async (
        req: Request,
        res: Response<ApiResponse<Provider[]>>,
        next: NextFunction
    ) => {
        try {
            const allProvider = await providerService.getAllProvider();
            res.json({
                ok: true,
                message: "All Provider",
                data: allProvider,
            });
        } catch (error) {
            next(error);
        }
    },
    providerById: async (
        req: Request,
        res: Response<ApiResponse<Provider>>,
        next: NextFunction
    ) => {
        try {
            const provider = await providerService.getProviderById(
                req.params.providerId
            );
            res.json({
                ok: true,
                message: "Provider Info",
                data: provider,
            });
        } catch (error) {
            next(error);
        }
    },
    createProvider: async (
        req: Request,
        res: Response<ApiResponse<Provider>>,
        next: NextFunction
    ) => {
        try {
            const newProvider = await providerService.createProvider(
                req.params.userId
            );
            res.json({
                ok: true,
                message: "Provider created!",
                data: newProvider,
            });
        } catch (error) {
            next(error);
        }
    },
    deleteProvider: async (
        req: Request,
        res: Response<ApiResponse<Provider>>,
        next: NextFunction
    ) => {
        try {
            const deletedProvider = await providerService.deleteProvider(
                req.params.providerId
            );
            res.json({
                ok: true,
                message: "Provider deleted",
                data: deletedProvider,
            });
        } catch (error) {
            next(error);
        }
    },
};

export default providerController;
