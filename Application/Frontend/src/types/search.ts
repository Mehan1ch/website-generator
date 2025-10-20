import {z} from "zod";

export const redirectOnlySearchSchema = z.object({
    redirect: z.url().default('/'),
});