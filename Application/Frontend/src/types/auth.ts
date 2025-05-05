import {User} from "@/types/user.ts";

export type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
}

export type LoginCredentials = {
    email: string;
    password: string;
}