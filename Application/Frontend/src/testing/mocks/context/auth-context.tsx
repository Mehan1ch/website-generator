import {ReactNode, useContext, useState} from 'react';
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

    const login = async (_credentials: LoginBody) => {
        const mockUser = createUser();
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('isAuthenticated', 'true');
    };

    const logout = async () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
    };

    const register = async (_credentials: RegisterBody) => {
        const mockUser = createUser();
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('isAuthenticated', 'true');
    };

    const fetchUserContext = async () => {
        if (!user) {
            const mockUser = createUser();
            setUser(mockUser);
            setIsAuthenticated(true);
            localStorage.setItem('user', JSON.stringify(mockUser));
            localStorage.setItem('isAuthenticated', 'true');
        }
    };

    const deleteUser = async () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
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