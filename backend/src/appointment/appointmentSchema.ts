import { z } from "zod";
import { string } from "zod/v4";

export const newAppointment = z.object({
    serviceId: z.string().cuid(),
    providerId: z.string().cuid(),
    startAt: z.date(),
    endsAt: z.date(),
});

export const editAppointment = z.object({
    serviceId: z.string().cuid().optional(),
    providerId: z.string().cuid().optional(),
    startAt: z.date().optional(),
    endsAt: z.date().optional(),
});

export type NewAppointment = z.infer<typeof newAppointment>;
export type EditAppointment = z.infer<typeof editAppointment>;
