import Axios, {AxiosError, AxiosRequestConfig, CreateAxiosDefaults} from 'axios';
import {toast} from "sonner";
import {redirect} from "@tanstack/react-router";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const axiosConfig: CreateAxiosDefaults = {
    baseURL: backendURL,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
}

export const AXIOS_INSTANCE = Axios.create(axiosConfig);

AXIOS_INSTANCE.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 419) {
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
            })
        }

        return Promise.reject(error);
    }
);

export const customClient = async <T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig,
): Promise<T> => {
    const {data} = await AXIOS_INSTANCE({...config, ...options});
    return data;
};

export default customClient;

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;