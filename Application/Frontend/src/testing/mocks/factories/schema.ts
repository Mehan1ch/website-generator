import {faker} from '@faker-js/faker';
import {Schema, SchemaCollectionItem, SchemaCollectionResponse} from "@/types/schema.ts";

export const createSchema = (overrides?: Partial<Schema>): Schema => ({
    id: faker.string.uuid(),
    name: faker.word.noun(),
    description: faker.lorem.paragraph(),
    content: 'q64FAA==',
    user_id: faker.string.uuid(),
    number_of_pages: faker.number.int({min: 0, max: 100}),
    state: faker.helpers.arrayElement(["draft", "published"]),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
    published_at: faker.date.past().toISOString(),
    ...overrides,
} as Schema);

export const createSchemaCollectionItem = (overrides?: Partial<SchemaCollectionItem>): SchemaCollectionItem => ({
    id: faker.string.uuid(),
    name: faker.word.noun(),
    description: faker.lorem.paragraph(),
    number_of_pages: faker.number.int({min: 0, max: 100}),
    state: faker.helpers.arrayElement(["draft", "published"]),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
    published_at: faker.date.past().toISOString(),
    ...overrides,
} as SchemaCollectionItem);

export const createSchemaCollection = (count: number = 5): SchemaCollectionItem[] => {
    return Array.from({length: count}, () => createSchemaCollectionItem());
};

export const createSchemaCollectionResponse = (count: number = 5, page: number = 1, per_page: number = 15) => {
    const last_page = Math.ceil(count / per_page);
    return {
        data: createSchemaCollection(count),
        meta: {
            total: count,
            per_page: per_page,
            current_page: page,
            last_page: last_page,
        },
        links: {
            first: `/api/schema?page=1&per_page=${per_page}`,
            last: `/api/schema?page=${last_page}&per_page=${per_page}`,
            prev: page > 1 ? `/api/schema?page=${page - 1}&per_page=${per_page}` : null,
            next: page < last_page ? `/api/schema?page=${page + 1}&per_page=${per_page}` : null,
        },
    } as SchemaCollectionResponse;
};
