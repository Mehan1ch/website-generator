import {ReactNode, useEffect, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import axios from "@/axios";
import {AuthContext} from "@/contexts/auth-context";
import {User} from "@/types/user.ts";
import {LoginCredentials, RegisterCredentials} from "@/types/auth.ts";
import {redirect} from "@tanstack/react-router";
import {toast} from "sonner";


export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const queryClient = useQueryClient();

    // Rehydrate auth state from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedAuth = localStorage.getItem('isAuthenticated');
        if (storedUser && storedAuth === 'true') {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }, []);

    // Save auth state to localStorage when it changes
    useEffect(() => {
        if (isAuthenticated && user) {
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('isAuthenticated', 'true');
        } else {
            localStorage.removeItem('user');
            localStorage.setItem('isAuthenticated', 'false');
        }
    }, [user, isAuthenticated]);

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
            toast.success("Login successful");
        } catch (error) {
            toast.error("Login failed");
            throw error;
        }
    };

    const logout = async () => {
        try {
            await axios.post('/logout');
            setUser(null);
            setIsAuthenticated(false);
            await queryClient.invalidateQueries({queryKey: ['auth']});
            toast.success("Logout successful");
        } catch (error) {
            toast.error("Logout failed");
            throw error;
        }
    };

    const register = async (credentials: RegisterCredentials) => {
        try {
            //TODO: refactor with Tanstack Query
            // Fetch CSRF token
            await axios.get('/sanctum/csrf-cookie');

            // Perform registration
            await axios.post('/register', credentials);

            // Invalidate auth queries
            await queryClient.invalidateQueries({queryKey: ['auth']});
            toast.success("Registration successful");
        } catch (error) {
            // TODO: include error messages from the server in the toast
            toast.error("Registration failed");
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    );
};
