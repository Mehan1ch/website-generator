import {LoginBody, RegisterBody, User200Data} from "@/api/models";

export type User = User200Data;

export type AuthState = {
    isError: boolean;
    isSuccess: boolean;
}

export type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    login: (credentials: LoginBody) => Promise<AuthState>;
    register: (credentials: RegisterBody) => Promise<AuthState>;
    logout: () => Promise<AuthState>;
}