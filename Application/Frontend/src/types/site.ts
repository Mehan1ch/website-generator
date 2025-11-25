import {paths} from "@/lib/api/v1";
import {Unpacked} from "@/types/helpers.ts";

export type SiteState = 'draft' | 'published';
type SiteCollectionData = paths["/api/v1/site"]["get"]["responses"]["200"]["content"]["application/json"]["data"];

export type SiteCollectionItem = NonNullable<Unpacked<SiteCollectionData>>;

export type SiteCollectionResponse = paths["/api/v1/site"]["get"]["responses"]["200"]["content"]["application/json"];

type SiteData = paths["/api/v1/site/{site_id}"]["get"]["responses"]["200"]["content"]["application/json"]["data"];

export type SiteDataResponse = paths["/api/v1/site/{site_id}"]["get"]["responses"]["200"]["content"]["application/json"];

export type Site = NonNullable<SiteData>;
