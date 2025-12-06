import {faker} from '@faker-js/faker';
import {Page, PageCollectionItem, PageCollectionResponse, PageDataResponse} from "@/types/pages.ts";

export const createPage = (overrides?: Partial<Page>): Page => ({
    id: faker.string.uuid(),
    site_id: faker.string.uuid(),
    title: faker.word.words(2),
    content: 'q64FAA==',
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
    ...overrides,
});

export const createPageCollectionItem = (overrides?: Partial<PageCollectionItem>): PageCollectionItem => {
    return {
        id: faker.string.uuid(),
        title: faker.word.words(2),
        created_at: faker.date.past().toISOString(),
        updated_at: faker.date.recent().toISOString(),
        ...overrides,
    };
};

export const createPageCollection = (count: number = 5): PageCollectionItem[] => {
    return Array.from({length: count}, () => createPageCollectionItem());
};

export const createPageCollectionResponse = (count: number = 5, page: number = 1, per_page: number = 15) => {
    const last_page = Math.ceil(count / per_page);
    return {
        data: createPageCollection(count),
        meta: {
            total: count,
            per_page: per_page,
            current_page: page,
            last_page: last_page,
        },
        links: {
            first: `/api/page?page=1&per_page=${per_page}`,
            last: `/api/page?page=${last_page}&per_page=${per_page}`,
            prev: page > 1 ? `/api/page?page=${page - 1}&per_page=${per_page}` : null,
            next: page < last_page ? `/api/page?page=${page + 1}&per_page=${per_page}` : null,
        },
    } as PageCollectionResponse;
};

export const createPageResponse = (overrides?: Partial<Page>): PageDataResponse => ({
    data: createPage(overrides),
});

