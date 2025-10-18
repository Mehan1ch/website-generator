import {ReactNode, useEffect, useState} from "react";
import {Spinner} from "@/components/ui/spinner.tsx";
import {LoginBody, RegisterBody} from "@/api/models";
import {useGetCSRFCookie} from "@/api/endpoints/csrf-protection/csrf-protection.gen.ts";
import {useLogin, useLogout, useRegister} from "@/api/endpoints/authentication/authentication.gen.ts";
import {toast} from "sonner";
import {AuthContext} from "@/contexts/auth-context";
import {User} from "@/types/auth.ts";
import {useUser} from "@/api/endpoints/endpoints/endpoints.gen.ts";

export function AuthProvider({children}: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const csrfQuery = useGetCSRFCookie({query: {enabled: false}});
    const loginMutation = useLogin();
    const logoutMutation = useLogout();
    const registerMutation = useRegister();
    const userQuery = useUser({query: {enabled: false}});


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
        await csrfQuery.refetch();
        await loginMutation.mutateAsync({data: credentials});
        const {data, isError} = await userQuery.refetch();

        if (loginMutation.isError || isError || !data) {
            toast.error("Login failed!");
            return {isSuccess: false, isError: true};
        }

        const userData: User = data.data as User;

        setIsAuthenticated(true);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('isAuthenticated', 'true');
        toast.success("Login successful!");
        return {isSuccess: true, isError: false};
    };


    const logout = async () => {
        await logoutMutation.mutateAsync();
        if (logoutMutation.isError) {
            toast.error("Logout failed!");
            return {isSuccess: false, isError: true};
        }
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        toast.success("Logout successful!");
        return {isSuccess: false, isError: false};
    };

    const register = async (credentials: RegisterBody) => {
        await csrfQuery.refetch();
        await registerMutation.mutateAsync({
            data: credentials
        });
        if (registerMutation.isError) {
            toast.error("Registration failed!");
            return {isSuccess: true, isError: false};
        }
        toast.success("Registration successful! Please log in.");
        return {isSuccess: true, isError: false};
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, user, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    );
}