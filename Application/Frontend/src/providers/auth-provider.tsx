import {ReactNode, useEffect, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import axios from "@/axios";
import {AuthContext} from "@/contexts/auth-context";
import {User} from "@/types/user.ts";
import {LoginCredentials} from "@/types/auth.ts";
import {redirect} from "@tanstack/react-router";


export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const queryClient = useQueryClient();

    // Axios interceptor to attach CSRF token and handle expired sessions
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response?.status === 401 || error.response?.status === 419) {
                    // Token expired or unauthenticated
                    setUser(null);
                    setIsAuthenticated(false);
                    await queryClient.invalidateQueries({queryKey: ['auth']});
                    throw redirect({
                        to: "/login",
                    })
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, [queryClient]);

    const login = async (credentials: LoginCredentials) => {
        try {
            // Fetch CSRF token
            await axios.get('/sanctum/csrf-cookie');

            // Perform login
            await axios.post('/login', credentials);

            // Fetch user data
            const userResponse = await axios.get('/api/user');

            const currentUser: User = userResponse.data;
            setUser(currentUser);
            setIsAuthenticated(true);

            // Invalidate auth queries
            await queryClient.invalidateQueries({queryKey: ['auth']});
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    const logout = async () => {
        await axios.post('/logout');
        setUser(null);
        setIsAuthenticated(false);
        await queryClient.invalidateQueries({queryKey: ['auth']});
    };

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
