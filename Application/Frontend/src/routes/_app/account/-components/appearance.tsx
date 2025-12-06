"use client";

import {Card} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Monitor, Moon, Palette, Sun} from "lucide-react";
import {useTheme} from "@/hooks/use-theme.tsx";

export const title = "Account Appearance Settings";

export default function Appearance() {
    const {theme, setTheme} = useTheme();

    return (
        <div className="mx-auto max-w-5xl p-6">
            <Card className="bg-card border p-8">
                <div className="border-b pb-6">
                    <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
                        <Palette/>
                        Appearance
                    </h2>
                    <p className="text-muted-foreground mt-2 text-sm">
                        Customize how the application looks and feels to match your preferences.
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Theme Selection */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium flex items-center gap-2 mb-4">
                                <Palette className="h-4 w-4"/>
                                Theme
                            </h3>
                            <RadioGroup value={theme} onValueChange={setTheme}
                                        className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <Label
                                    htmlFor="light"
                                    className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary"
                                >
                                    <RadioGroupItem value="light" id="light" className="sr-only"/>
                                    <Sun className="mb-3 h-6 w-6"/>
                                    <div className="space-y-1 text-center">
                                        <p className="text-sm font-medium leading-none">Light</p>
                                        <p className="text-xs text-muted-foreground">Day theme</p>
                                    </div>
                                </Label>

                                <Label
                                    htmlFor="dark"
                                    className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary"
                                >
                                    <RadioGroupItem value="dark" id="dark" className="sr-only"/>
                                    <Moon className="mb-3 h-6 w-6"/>
                                    <div className="space-y-1 text-center">
                                        <p className="text-sm font-medium leading-none">Dark</p>
                                        <p className="text-xs text-muted-foreground">Night theme</p>
                                    </div>
                                </Label>

                                <Label
                                    htmlFor="system"
                                    className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary"
                                >
                                    <RadioGroupItem value="system" id="system" className="sr-only"/>
                                    <Monitor className="mb-3 h-6 w-6"/>
                                    <div className="space-y-1 text-center">
                                        <p className="text-sm font-medium leading-none">System</p>
                                        <p className="text-xs text-muted-foreground">Auto switch</p>
                                    </div>
                                </Label>
                            </RadioGroup>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
