import { DayOff } from "@prisma/client";
import { AuthorizedRequest } from "../middlewares/authorize";
import { ApiResponse } from "../types/global";
import { NextFunction, Response } from "express";
import dayOffService from "./dayOffService";

const dayOffController = {
    getDayOffs: async (
        req: AuthorizedRequest,
        res: Response<ApiResponse<DayOff[]>>,
        next: NextFunction
    ) => {
        try {
            const allDayOffs = await dayOffService.listDayOff(req.user!.id);
            res.json({
                ok: true,
                message: "All day off:",
                data: allDayOffs,
            });
        } catch (error) {
            next(error);
        }
    },
    createDayOff: async (
        req: AuthorizedRequest,
        res: Response<ApiResponse<DayOff>>,
        next: NextFunction
    ) => {
        try {
            const newDayOff = await dayOffService.createDayOff(
                req.user!.id,
                req.body
            );
            res.json({
                ok: true,
                message: "Day off created!",
                data: newDayOff,
            });
        } catch (error) {
            next(error);
        }
    },
    deleteDayOff: async (
        req: AuthorizedRequest,
        res: Response<ApiResponse<DayOff>>,
        next: NextFunction
    ) => {
        try {
            const deletedDayOff = await dayOffService.deleteDayOff(
                req.user!.id,
                req.params.dayOffId
            );
            res.json({
                ok: true,
                message: "Day off deleted",
                data: deletedDayOff,
            });
        } catch (error) {
            next(error);
        }
    },
};

export default dayOffController;
