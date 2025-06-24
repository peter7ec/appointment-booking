import { start } from "repl";
import { z } from "zod";

export const newDayOff = z.object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    reason: z.string(),
});

export type NewDayOff = z.infer<typeof newDayOff>;
