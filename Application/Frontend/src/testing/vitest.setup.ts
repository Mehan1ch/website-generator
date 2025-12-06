import {afterAll, afterEach, beforeAll, vi} from 'vitest';
import {server} from "./mocks/server.ts";
import 'vitest-browser-react';
import {testQueryClient} from "@/testing/utils/file-route-utils.tsx";
import {useMockAuth} from "@/testing/mocks/context/auth-context.tsx";
import {useMockTheme} from "@/testing/mocks/context/theme-context.tsx";

vi.mock("@/hooks/use-auth.tsx", () => ({
    useAuth: useMockAuth
}));

vi.mock("@/hooks/use-theme.tsx", () => ({
    useTheme: useMockTheme
}));

beforeAll(async () => {
    await server.start();
});

afterEach(() => {
    server.resetHandlers();
    testQueryClient.clear();
});

afterAll(() => {
    server.stop();
});