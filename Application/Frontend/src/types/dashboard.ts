import {paths} from "@/lib/api/v1";
import {Unpacked} from "@/types/helpers.ts";

export type DashboardResponse = paths["/api/v1/dashboard"]["get"]["responses"]["200"]["content"]["application/json"];

export type DashboardDataResponse = paths["/api/v1/dashboard"]["get"]["responses"]["200"]["content"]["application/json"]["data"];

export type DashboardData = NonNullable<Unpacked<DashboardDataResponse>>;
