import {paths} from "@/lib/api/v1";
import {Unpacked} from "@/types/helpers.ts";
import {z} from "zod";

type SchemaCollectionData = paths["/api/v1/schema"]["get"]["responses"]["200"]["content"]["application/json"]["data"];

export type SchemaCollectionItem = NonNullable<Unpacked<SchemaCollectionData>>;

export type SchemaCollectionResponse = paths["/api/v1/schema"]["get"]["responses"]["200"]["content"]["application/json"];

type SchemaData = paths["/api/v1/schema/{schema_id}"]["get"]["responses"]["200"]["content"]["application/json"]["data"];

export type SchemaDataResponse = paths["/api/v1/schema/{schema_id}"]["get"]["responses"]["200"]["content"]["application/json"];

export type Schema = NonNullable<SchemaData>;

export type SchemaState = 'draft' | 'published';

export const createSchemaForm = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
});

export type CreateSchemaBody = z.infer<typeof createSchemaForm>;

export const updateSchemaForm = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    content: z.string().optional(),
});

export type UpdateSchemaBody = z.infer<typeof updateSchemaForm>;
