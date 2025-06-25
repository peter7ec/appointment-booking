import { start } from "repl";
import { z } from "zod";

export const newPService = z.object({
    name: z.coerce.string(),
    durationMin: z.coerce.number(),
    price: z.number(),
    currency: z.string().optional(),
});
export const editPService = z.object({
    name: z.coerce.string().optional(),
    durationMin: z.coerce.number().optional(),
    price: z.number().optional(),
    currency: z.string().optional(),
});

export type NewPService = z.infer<typeof newPService>;
export type EditPService = z.infer<typeof editPService>;
