import { NextFunction, Request, Response } from "express";
import { GetWorkTimeForDayBody } from "./workWeekCicleSchema";
import workWeekCicleService from "./workWeekCicleService";
import { ApiResponse } from "../types/global";
import { OneDayWorkTime } from "./workWeekCicleTypes";
import { WorkWeekCicle } from "@prisma/client";

const workWeekCircleController = {
    allWorkTimeForDay: async (
        req: Request<any, any, GetWorkTimeForDayBody>,
        res: Response<ApiResponse<OneDayWorkTime>>,
        next: NextFunction
    ) => {
        try {
            const providerId = req.params.providerId;

            const targetDate = req.body.targetDate;

            const workHours = await workWeekCicleService.getAllWorkTimeForDay(
                providerId,
                targetDate
            );

            res.json({
                ok: true,
                message: "Work time",
                data: workHours,
            });
        } catch (error) {
            next(error);
        }
    },
    workTimeById: async (
        req: Request,
        res: Response<ApiResponse<WorkWeekCicle>>,
        next: NextFunction
    ) => {
        try {
            const workCicleById = await workWeekCicleService.getWorkTimeById(
                req.params.providerId
            );
            res.json({
                ok: true,
                message: "Work time by id",
                data: workCicleById,
            });
        } catch (error) {
            next(error);
        }
    },
    createWorkTime: async (
        req: Request,
        res: Response<ApiResponse<WorkWeekCicle>>,
        next: NextFunction
    ) => {
        try {
            const newWorkTime = await workWeekCicleService.createWorkTime(
                req.body
            );

            res.json({
                ok: true,
                message: "Work cicle created!",
                data: newWorkTime,
            });
        } catch (error) {
            next(error);
        }
    },
    editWorkTime: async (
        req: Request,
        res: Response<ApiResponse<WorkWeekCicle>>,
        next: NextFunction
    ) => {
        try {
            const editedWorkCicle = await workWeekCicleService.editWorkTime(
                req.params.workCicleId,
                req.body
            );
            res.json({
                ok: true,
                message: "Work cicle edited!",
                data: editedWorkCicle,
            });
        } catch (error) {
            next(error);
        }
    },
    deleteWorkTime: async (
        req: Request,
        res: Response<ApiResponse<WorkWeekCicle>>,
        next: NextFunction
    ) => {
        try {
            const deletedCicle = await workWeekCicleService.deleteWorkTime(
                req.params.workCicleId
            );
            res.json({
                ok: true,
                message: "Work cicle created!",
                data: deletedCicle,
            });
        } catch (error) {
            next(error);
        }
    },
};

export default workWeekCircleController;
