import createFetchClient, {Middleware} from "openapi-fetch";
import createClient from "openapi-react-query";
import {paths} from "@/lib/api/v1";
import {toast} from "sonner";
import {redirect} from "@tanstack/react-router";

export class APIError extends Error {
    public errors: unknown;
    public status: number;

    constructor(message: string, errors?: unknown, status?: number) {
        super(message);
        this.name = 'APIError';
        this.errors = errors;
        this.status = status || 404;
    }
}

const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost";

const fetchClient = createFetchClient<paths>({
    baseUrl: baseUrl,
    credentials: "include",
    headers: {
        "Accept": "application/json",
    }
});


function getCookieValue(name: string): string | null {
    return document.cookie
        .split(';')
        .map(c => c.trim())
        .filter(cookie => {
            return cookie.substring(0, name.length + 1) === `${name}=`;
        })
        .map(cookie => {
            return decodeURIComponent(cookie.substring(name.length + 1));
        })[0] ?? null;
}

async function getXSRFToken(name: string = 'XSRF-TOKEN') {
    if (getCookieValue(name) === null) {
        await fetch(`${baseUrl}/sanctum/csrf-cookie`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
    }
    return getCookieValue(name)!;
}

const middleware: Middleware = {
    async onRequest({request}) {
        const xsrfToken = await getXSRFToken();
        request.headers.set("X-XSRF-TOKEN", xsrfToken);
        return request;
    },
    async onResponse({response}) {
        if (!response.ok) {
            const responseJson = await response.json();
            throw new APIError(responseJson.message, responseJson.errors, response.status);
        }
    },
    async onError({error}) {
        if ((error as APIError).status === 401 || (error as APIError).status === 419) {
            // Clear auth state
            localStorage.removeItem('user');
            localStorage.setItem('isAuthenticated', 'false');

            // Show notification
            toast.error('Session expired. Please log in again.');

            // Redirect to login
            throw redirect({
                to: "/login",
                search: {
                    redirect: location.href
                }
            });
        }
    }
};

fetchClient.use(middleware);
export const api = createClient(fetchClient);