import {createContext} from "react";
import {User} from "@/types/user.ts";


type AuthContext = {
    user: User | null;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContext | undefined>(undefined);
