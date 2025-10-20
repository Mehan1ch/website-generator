import {z} from "zod";

export const redirectOnlySearchSchema = z.object({
    redirect: z.string().default('/'),
});