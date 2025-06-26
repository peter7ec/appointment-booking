import { z } from "zod";

export const newWorkWeekCicle = z.object({
    providerId: z.string(),
    dayOfWeek: z.number().array(),
    startTime: z.string(),
    endTime: z.string(),
});

export const getWorkTimeForDaySchema = z.object({
    targetDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Invalid Date format (YYYY-MM-DD)",
    }),
});

export const editWorkWeekCicle = z.object({
    dayOfWeek: z.number().array().optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
});

export type NewWorkWeekCicle = z.infer<typeof newWorkWeekCicle>;
export type EditWorkWeekCicle = z.infer<typeof editWorkWeekCicle>;
export type GetWorkTimeForDayBody = z.infer<typeof getWorkTimeForDaySchema>;
