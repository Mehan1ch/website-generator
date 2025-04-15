import * as React from 'react';
import {createContext, useContext, useState} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {User} from "@/models/user.ts";
import axios from 'axios';

interface AuthContextType {
    user: User | null;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState(null);
    const queryClient = useQueryClient();

    const login = async (credentials: { email: string; password: string }) => {
        const response = await axios.post('/login', credentials);
        setUser(response.data.user);
        await queryClient.invalidateQueries({queryKey: ['auth']});
    };

    const logout = async () => {
        await axios.post('/logout');
        setUser(null);
        await queryClient.invalidateQueries({queryKey: ['auth']});
    };

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};