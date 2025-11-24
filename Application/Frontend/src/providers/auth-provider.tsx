import {ReactNode, useEffect, useState} from "react";
import {toast} from "sonner";
import {AuthContext} from "@/contexts/auth-context";
import {LoginBody, RegisterBody, User} from "@/types/auth.ts";
import {api, APIError} from "@/lib/api/api-client.ts";
import {useQueryClient} from "@tanstack/react-query";
import {Loading} from "@/components/blocks/loading.tsx";

export function AuthProvider({children}: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const loginMutation = api.useMutation("post", "/login");
    const registerMutation = api.useMutation("post", "/register");
    const logoutMutation = api.useMutation("post", "/logout");
    const deleteUserMutation = api.useMutation("delete", "/api/v1/user");
    const queryClient = useQueryClient();
    const userQueryOptions = api.queryOptions("get", "/api/v1/user");


// Restore auth state on app load
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedAuth = localStorage.getItem('isAuthenticated');
        if (storedUser && storedAuth) {
            setUser(JSON.parse(storedUser) as User);
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

// Show loading state while checking auth
    if (isLoading) {
        return (
            <Loading/>
        );
    }

    const login = async (credentials: LoginBody) => {
        await loginMutation.mutateAsync({body: credentials});
        await fetchUserContext();
    };


    const logout = async () => {
        logoutMutation.mutate({}, {
            onSuccess: () => {
                setUser(null);
                setIsAuthenticated(false);
                localStorage.removeItem('user');
                localStorage.removeItem('isAuthenticated');
                toast.success("Logout successful!");
            },
            onError: (error) => {
                toast.error("Logout failed!", {
                    description: (error as APIError).message
                });
                throw error;
            }
        });
    };

    const register = async (credentials: RegisterBody) => {
        await registerMutation.mutateAsync({body: credentials});
        await fetchUserContext();
    };


    const fetchUserContext = async () => {
        const {data} = await queryClient.fetchQuery(userQueryOptions);
        if (!data) throw new APIError("No user found!", {}, 404);
        const user: User = data! as User;
        setUser(user);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isAuthenticated', 'true');
    };

    const deleteUser = async () => {
        deleteUserMutation.mutate({}, {
            onSuccess: () => {
                setUser(null);
                setIsAuthenticated(false);
                localStorage.removeItem('user');
                localStorage.removeItem('isAuthenticated');
            },
            onError: (error) => {
                throw error;
            }
        });
    };

    return (
        <AuthContext.Provider
            value={{isAuthenticated, user, login, logout, register, fetchUserContext, deleteUser}}>
            {children}
        </AuthContext.Provider>
    );
}