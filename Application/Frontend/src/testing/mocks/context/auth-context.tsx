import {ReactNode, useContext, useEffect, useState} from 'react';
import {LoginBody, RegisterBody, User} from "@/types/auth.ts";
import {createUser} from "@/testing/mocks/factories/user.ts";
import {AuthContext} from "@/contexts/auth-context.ts";

const MockAuthProvider = ({
                              children,
                              initialValue,
                          }: {
    children: ReactNode
    initialValue?: { user: User | null; isAuthenticated: boolean } | null
}) => {
    const [user, setUser] = useState<User | null>(initialValue?.user || null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialValue?.isAuthenticated || false);

    useEffect(() => {
        if (initialValue?.user) {
            setUser(initialValue.user);
        } else {
            setUser(null);
        }

        if (initialValue?.isAuthenticated) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [initialValue]);

    const login = async (_credentials: LoginBody) => {
        const mockUser = createUser();
        setUser(mockUser);
        setIsAuthenticated(true);
    };

    const logout = async () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    const register = async (_credentials: RegisterBody) => {
        const mockUser = createUser();
        setUser(mockUser);
        setIsAuthenticated(true);
    };

    const fetchUserContext = async () => {
        if (!user) {
            const mockUser = createUser();
            setUser(mockUser);
            setIsAuthenticated(true);
        }
    };

    const deleteUser = async () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            login,
            logout,
            register,
            fetchUserContext,
            deleteUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};
export default MockAuthProvider;

export const useMockAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};

export const createMockAuthenticatedContext = (overrides?: Partial<User>) => {
    const user = createUser(overrides);
    return {user, isAuthenticated: true};
};

export const createMockUnauthenticatedContext = () => {
    return {user: null, isAuthenticated: false};
};