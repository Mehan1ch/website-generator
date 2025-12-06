import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {Theme} from '@/types/theme.ts';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface MockThemeProviderProps {
    children: ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
    initialTheme?: Theme;
}

/**
 * Mock ThemeProvider for testing
 * Mimics the behavior of the real ThemeProvider without DOM manipulation
 */
export const MockThemeProvider = ({
                                      children,
                                      defaultTheme = 'system',
                                      storageKey = 'vite-ui-theme',
                                      initialTheme,
                                  }: MockThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(
        () => {
            // Allow tests to override the initial theme
            if (initialTheme) return initialTheme;

            const stored = localStorage.getItem(storageKey) as Theme;
            return stored || defaultTheme;
        }
    );

    useEffect(() => {
        // Mock DOM manipulation - in tests we just track the theme
        // Real provider would modify document.documentElement.classList
        const root = window.document.documentElement;

        root.classList.remove('light', 'dark');

        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';
            root.classList.add(systemTheme);
            return;
        }

        root.classList.add(theme);
    }, [theme]);

    const value = {
        theme,
        setTheme: (newTheme: Theme) => {
            localStorage.setItem(storageKey, newTheme);
            setTheme(newTheme);
        },
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useMockTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within MockThemeProvider');
    }
    return context;
};

/**
 * Helper to create theme context for tests
 */
export const createThemeContext = (theme: Theme = 'light') => {
    return {theme};
};

