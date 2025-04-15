import {createContext} from "react";
import {User} from "@/models/user.ts";


interface AuthContextType {
    user: User | null;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
