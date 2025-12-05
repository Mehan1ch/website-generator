import {faker} from '@faker-js/faker';
import {Site, SiteCollectionItem} from "@/types/site.ts";

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