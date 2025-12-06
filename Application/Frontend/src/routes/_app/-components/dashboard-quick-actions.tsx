import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "@tanstack/react-router";
import {FileText, FolderPlus, Plus} from "lucide-react";

export const DashboardQuickActions = () => {
    const actions = [
        {
            title: "Create New Site",
            description: "Start building a new website",
            icon: FolderPlus,
            href: "/sites/create",
            variant: "default" as const,
        },
        {
            title: "View All Sites",
            description: "Browse your existing sites",
            icon: FileText,
            href: "/sites",
            variant: "outline" as const,
        },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5"/>
                    Quick Actions
                </CardTitle>
                <CardDescription>
                    Common tasks to get you started
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                    {actions.map((action) => {
                        const Icon = action.icon;
                        return (
                            <Link key={action.title} to={action.href}>
                                <Button
                                    variant={action.variant}
                                    className="h-auto w-full flex-col items-start gap-2 p-4 text-left"
                                >
                                    <Icon className="h-5 w-5"/>
                                    <div className="space-y-1">
                                        <div className="font-semibold">{action.title}</div>
                                        <div className="text-xs font-normal opacity-70">
                                            {action.description}
                                        </div>
                                    </div>
                                </Button>
                            </Link>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};

