import {afterAll, afterEach, beforeAll} from 'vitest';
import {server} from "./mocks/server.ts";
import 'vitest-browser-react';
import {testQueryClient} from "@/testing/utils/file-route-utils.tsx";

beforeAll(async () => {
    await server.start({onUnhandledRequest: 'bypass'});
});

afterEach(() => {
    server.resetHandlers();
    testQueryClient.clear();
});

afterAll(() => {
    server.stop();
});