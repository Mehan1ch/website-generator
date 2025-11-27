import {paths} from "@/lib/api/v1";
import {Unpacked} from "@/types/helpers.ts";

type PageCollectionData = paths["/api/v1/site/{site_id}/page"]["get"]["responses"]["200"]["content"]["application/json"]["data"];

export type PageCollectionItem = NonNullable<Unpacked<PageCollectionData>>;

export type PageCollectionResponse = paths["/api/v1/site/{site_id}/page"]["get"]["responses"]["200"]["content"]["application/json"];

type PageData = paths["/api/v1/site/{site_id}/page/{page_id}"]["get"]["responses"]["200"]["content"]["application/json"]["data"];

export type PageDataResponse = paths["/api/v1/site/{site_id}/page/{page_id}"]["get"]["responses"]["200"]["content"]["application/json"];

export type Page = NonNullable<PageData>;
