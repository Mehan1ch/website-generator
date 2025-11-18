'use client';

import * as React from 'react';
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {Globe} from "lucide-react";
import {Link} from "@tanstack/react-router";

// Types
export interface NavbarNavLink {
    href: string;
    label: string;
    active?: boolean;
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
    isAuthenticated: boolean;
    logo?: React.ReactNode;
    logoHref?: string;
    appName?: string;
    navigationLinks?: NavbarNavLink[];
    signInText?: string;
    registerText?: string;
    dashboardText?: string;
}

const {VITE_APP_NAME} = import.meta.env;

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
    (
        {
            className,
            isAuthenticated,
            logo = <Globe/>,
            logoHref = '/',
            appName = `${VITE_APP_NAME}`,
            signInText = 'Sign In',
            registerText = 'Register',
            dashboardText = 'Dashboard',
            ...props
        },
    ) => {

        return (
            <header
                className={cn(
                    'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 [&_*]:no-underline',
                    className
                )}
                {...props}
            >
                <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-6">
                            <div className="text-2xl">
                                {logo}
                            </div>
                            <span className="hidden font-bold text-xl sm:inline-block">{appName}</span>
                        </div>
                    </div>
                    {/* Right side */}
                    <div className="flex items-center gap-3">
                        {!isAuthenticated ? (
                            <>
                                <Link to={"/login"}>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                                    >
                                        {signInText}
                                    </Button>
                                </Link>
                                <Link to={"/register"}>
                                    <Button
                                        size="sm"
                                        className="text-sm font-medium px-4 h-9 rounded-md shadow-sm"
                                    >
                                        {registerText}
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <Link to={"/dashboard"}>
                                <Button
                                    size="sm"
                                    className="text-sm font-medium px-4 h-9 rounded-md shadow-sm"
                                >
                                    {dashboardText}
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </header>
        );
    }
);

Navbar.displayName = 'Navbar01';