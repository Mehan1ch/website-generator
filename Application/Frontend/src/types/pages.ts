import {paths} from "@/lib/api/v1";
import {Unpacked} from "@/types/helpers.ts";
import {z} from "zod";

type PageCollectionData = paths["/api/v1/site/{site_id}/page"]["get"]["responses"]["200"]["content"]["application/json"]["data"];

export type PageCollectionItem = NonNullable<Unpacked<PageCollectionData>>;

export type PageCollectionResponse = paths["/api/v1/site/{site_id}/page"]["get"]["responses"]["200"]["content"]["application/json"];

type PageData = paths["/api/v1/site/{site_id}/page/{page_id}"]["get"]["responses"]["200"]["content"]["application/json"]["data"];

export type PageDataResponse = paths["/api/v1/site/{site_id}/page/{page_id}"]["get"]["responses"]["200"]["content"]["application/json"];

export type Page = NonNullable<PageData>;

export const createPageForm = z.object({
    title: z.string().min(1, "Title is required"),
    url: z.string().startsWith("/").min(1, "Url is required"),
    content: z.string().optional(),
    html: z.string().optional(),
});

export type CreatePageBody = z.infer<typeof createPageForm>;

export const updatePageForm = z.object({
    title: z.string().optional(),
    url: z.string().startsWith("/").optional(),
    content: z.string().optional(),
    html: z.string().optional(),
});


export type UpdateSiteBody = z.infer<typeof updatePageForm>;
