import {useContext} from 'react';
import {AuthContext} from "@/contexts/auth-context.ts";


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an UseAuth');
    }
    return context;
};