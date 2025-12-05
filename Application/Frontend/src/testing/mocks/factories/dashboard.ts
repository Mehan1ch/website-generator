import {DashboardDataResponse, DashboardResponse} from "@/types/dashboard.ts";
import {faker} from "@faker-js/faker";


export const createDashboardResponse = (overrides?: Partial<DashboardResponse>) => {
    return {
        data: {
            total_sites: faker.number.int({min: 1, max: 1000}),
            total_pages: faker.number.int({min: 1, max: 1000}),
            draft_sites: faker.number.int({min: 1, max: 1000}),
            published_sites: faker.number.int({min: 1, max: 1000}),
            recent_activity: {
                name: faker.word.noun(),
                updated_at: faker.date.past().toISOString(),
            },
            latest_site: {
                name: faker.word.noun(),
                created_at: faker.date.past().toISOString(),
            }
        } as DashboardDataResponse,
        ...overrides,
    };
};
