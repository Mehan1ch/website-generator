import {faker} from '@faker-js/faker';
import {User} from "@/types/auth.ts";


export const createUser = (overrides?: Partial<User>): User => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    is_admin: faker.datatype.boolean(),
    email_verified_at: faker.date.past().toISOString(),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
    ...overrides,
});

export const createUsers = (count: number = 5): User[] => {
    return Array.from({length: count}, () => createUser());
};