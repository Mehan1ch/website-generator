import {User} from "@/types/user.ts";

export type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    logout: () => Promise<void>;
}

export type LoginCredentials = {
    email: string;
    password: string;
}

export type RegisterCredentials = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}