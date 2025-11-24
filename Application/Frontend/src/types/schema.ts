import {paths} from "@/lib/api/v1";
import {Unpacked} from "@/types/helpers.ts";

type SchemaCollectionData = paths["/api/v1/schema"]["get"]["responses"]["200"]["content"]["application/json"]["data"];
export type SchemaCollectionItem = NonNullable<Unpacked<SchemaCollectionData>>;

export type SchemaCollectionResponse = paths["/api/v1/schema"]["get"]["responses"]["200"]["content"]["application/json"];

type SchemaData = paths["/api/v1/schema/{schema_id}"]["get"]["responses"]["200"]["content"]["application/json"]["data"];
export type Schema = NonNullable<SchemaData>;