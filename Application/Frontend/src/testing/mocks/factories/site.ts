import {faker} from '@faker-js/faker';
import {Site, SiteCollectionItem, SiteCollectionResponse} from "@/types/site.ts";

export const createSite = (overrides?: Partial<Site>): Site => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    description: faker.lorem.paragraph(),
    user_id: faker.string.uuid(),
    number_of_pages: faker.number.int({min: 0, max: 1000}),
    subdomain: faker.internet.domainName(),
    state: faker.helpers.arrayElement(["draft", "published"]),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
    published_at: faker.date.past().toISOString(),
    ...overrides,
});


export const createSiteCollectionItem = (overrides?: Partial<SiteCollectionItem>): SiteCollectionItem => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    description: faker.lorem.paragraph(),
    subdomain: faker.internet.domainName(),
    number_of_pages: faker.number.int({min: 0, max: 1000}),
    state: faker.helpers.arrayElement(["draft", "published"]),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
    published_at: faker.date.past().toISOString(),
    ...overrides,
});
export const createSiteCollection = (count: number = 5): SiteCollectionItem[] => {
    return Array.from({length: count}, () => createSiteCollectionItem());
};

export const createSiteCollectionResponse = (count: number = 5, page: number = 1, per_page: number = 15) => {
    const last_page = Math.ceil(count / per_page);
    return {
        data: createSiteCollection(count),
        meta: {
            total: count,
            per_page: per_page,
            current_page: page,
            last_page: last_page,
        },
        links: {
            first: `/api/sites?page=1&per_page=${per_page}`,
            last: `/api/sites?page=${last_page}&per_page=${per_page}`,
            prev: page > 1 ? `/api/sites?page=${page - 1}&per_page=${per_page}` : null,
            next: page < last_page ? `/api/sites?page=${page + 1}&per_page=${per_page}` : null,
        },
    } as SiteCollectionResponse;
};