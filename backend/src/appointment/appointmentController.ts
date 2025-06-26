import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../types/global";
import { Appointment } from "@prisma/client";
import appointmentService from "./appointmentService";
import { AuthorizedRequest } from "../middlewares/authorize";

const appointmentController = {
    allAppointment: async (
        req: Request,
        res: Response<ApiResponse<Appointment[]>>,
        next: NextFunction
    ) => {
        try {
            const appointments = await appointmentService.getAllAppointment();

            res.json({
                ok: true,
                message: "All appointment",
                data: appointments,
            });
        } catch (error) {
            next(error);
        }
    },
    appointmentByProvider: async (
        req: Request,
        res: Response<ApiResponse<Appointment[]>>,
        next: NextFunction
    ) => {
        try {
            const appointments =
                await appointmentService.getAppointmentsByProvider(
                    req.params.providerId
                );

            res.json({
                ok: true,
                message: "All appointments by provider",
                data: appointments,
            });
        } catch (error) {
            next(error);
        }
    },
    appointmentById: async (
        req: Request,
        res: Response<ApiResponse<Appointment>>,
        next: NextFunction
    ) => {
        try {
            const appointment = await appointmentService.getAppointmentById(
                req.params.appointmentId
            );

            res.json({
                ok: true,
                message: "All appointment",
                data: appointment,
            });
        } catch (error) {
            next(error);
        }
    },
    appointmentByClient: async (
        req: AuthorizedRequest,
        res: Response<ApiResponse<Appointment[]>>,
        next: NextFunction
    ) => {
        try {
            const appointments =
                await appointmentService.getAppointmentByClient(req.user!.id);

            res.json({
                ok: true,
                message: "All appointments by client",
                data: appointments,
            });
        } catch (error) {
            next(error);
        }
    },
    appointmentDelete: async (
        req: Request,
        res: Response<ApiResponse<Appointment>>,
        next: NextFunction
    ) => {
        try {
            const deletedAppointment =
                await appointmentService.deleteAppointment(
                    req.params.appointmentId
                );
            res.json({
                ok: true,
                message: "Appointment deleted",
                data: deletedAppointment,
            });
        } catch (error) {
            next(error);
        }
    },
    appointmentEdit: async (
        req: Request,
        res: Response<ApiResponse<Appointment>>,
        next: NextFunction
    ) => {
        try {
            const editedAppointment = await appointmentService.editAppointment(
                req.params.appointmentId,
                req.body
            );
            res.json({
                ok: true,
                message: "Appointment deleted",
                data: editedAppointment,
            });
        } catch (error) {
            next(error);
        }
    },
    appointmentCreate: async (
        req: AuthorizedRequest,
        res: Response<ApiResponse<Appointment>>,
        next: NextFunction
    ) => {
        try {
            const newAppointment = await appointmentService.createAppointment(
                req.user!.id,
                req.body
            );
            res.json({
                ok: true,
                message: "Appointment created",
                data: newAppointment,
            });
        } catch (error) {
            next(error);
        }
    },
};

export default appointmentController;
