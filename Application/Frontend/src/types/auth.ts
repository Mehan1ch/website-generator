import {User} from "@/types/user.ts";

export type AuthContextType = {
    user: User | null;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
}
