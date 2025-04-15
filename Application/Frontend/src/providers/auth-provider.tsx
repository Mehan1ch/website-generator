import * as React from "react";
import {useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {AuthContext} from "@/contexts/auth-context";


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
        <AuthContext.Provider value={
            {
                user, login, logout
            }
        }>
            {
                children
            }
        </AuthContext.Provider>
    )
        ;
};
