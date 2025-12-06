import {paths} from "@/lib/api/v1";
import {Unpacked} from "@/types/helpers.ts";
import {z} from "zod";

export type SiteState = 'draft' | 'published';
type SiteCollectionData = paths["/api/v1/site"]["get"]["responses"]["200"]["content"]["application/json"]["data"];

export type SiteCollectionItem = NonNullable<Unpacked<SiteCollectionData>>;

export type SiteCollectionResponse = paths["/api/v1/site"]["get"]["responses"]["200"]["content"]["application/json"];

type SiteData = paths["/api/v1/site/{site_id}"]["get"]["responses"]["200"]["content"]["application/json"]["data"];

export type SiteDataResponse = paths["/api/v1/site/{site_id}"]["get"]["responses"]["200"]["content"]["application/json"];

export type Site = NonNullable<SiteData>;

export const createSiteForm = z.object({
    name: z.string().min(1, "Name is required"),
    subdomain: z.string().min(1, "Subdomain is required"),
    description: z.string().optional(),
});

export type CreateSiteBody = z.infer<typeof createSiteForm>;

export const updateSiteForm = z.object({
    name: z.string().min(1, "Name is required"),
    subdomain: z.string().min(1, "Subdomain is required"),
    description: z.string().optional(),
});

export type UpdateSiteBody = z.infer<typeof updateSiteForm>;