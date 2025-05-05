import {User} from "@/types/user.ts";

export type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
}
