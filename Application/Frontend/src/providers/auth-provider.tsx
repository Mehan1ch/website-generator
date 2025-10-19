import {ReactNode, useEffect, useState} from "react";
import {Spinner} from "@/components/ui/spinner.tsx";
import {toast} from "sonner";
import {AuthContext} from "@/contexts/auth-context";
import {LoginBody, User} from "@/types/auth.ts";
import {APIError, useApi} from "@/hooks/use-api.tsx";

export function AuthProvider({children}: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const api = useApi();
    const loginMutation = api.useMutation("post", "/login");
    const logoutMutation = api.useMutation("post", "/logout");
    const deleteUserMutation = api.useMutation("delete", "/api/user");
    const userQuery = api.useQuery("get", "/api/user", {
        enabled: false,
        throwOnError: true,
    });


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
            <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
                <Spinner/>
                <p className="text-muted-foreground">Loading...</p>
            </div>
        );
    }

    const login = async (credentials: LoginBody) => {
        await loginMutation.mutateAsync({body: credentials});
        const {data} = await userQuery.refetch();
        const user: User = data!.data as User;
        setIsAuthenticated(true);
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isAuthenticated', 'true');
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

    const updateUserContext = async () => {
        const {data} = await userQuery.refetch();
        const user: User = data!.data as User;
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
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
        <AuthContext.Provider value={{isAuthenticated, user, login, logout, updateUserContext, deleteUser}}>
            {children}
        </AuthContext.Provider>
    );
}