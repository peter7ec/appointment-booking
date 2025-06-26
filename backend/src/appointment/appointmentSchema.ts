import { z } from "zod";
import { string } from "zod/v4";

export const newAppointment = z.object({
    serviceId: z.string().cuid(),
    providerId: z.string().cuid(),
    startAt: z.coerce.date(),
    endsAt: z.coerce.date(),
});

export const editAppointment = z.object({
    serviceId: z.string().cuid().optional(),
    providerId: z.string().cuid().optional(),
    startAt: z.coerce.date().optional(),
    endsAt: z.coerce.date().optional(),
});

export type NewAppointment = z.infer<typeof newAppointment>;
export type EditAppointment = z.infer<typeof editAppointment>;
