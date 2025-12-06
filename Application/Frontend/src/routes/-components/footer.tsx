"use client";

import {Badge} from "@/components/ui/badge.tsx";

const YEAR = new Date().getFullYear();
const {VITE_APP_NAME} = import.meta.env;
export default function Footer() {
    return (
        <footer className="w-full border-t pb-8 pt-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    <p className="text-muted-foreground text-center text-sm md:text-left">
                        &copy; {YEAR} {VITE_APP_NAME} All rights reserved.
                    </p>
                    <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="px-3 py-1">
                            v1.0.0
                        </Badge>
                    </div>
                </div>
            </div>
        </footer>
    );
}
