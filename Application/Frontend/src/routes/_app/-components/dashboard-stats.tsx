import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {DashboardData} from "@/types/dashboard.ts";
import {FileText, Globe, Layout} from "lucide-react";

type DashboardStatsProps = {
    data: DashboardData;
}

export const DashboardStats = ({data}: DashboardStatsProps) => {
    const stats = [
        {
            title: "Total Sites",
            value: data.total_sites ?? 0,
            description: "All your sites",
            icon: Globe,
        },
        {
            title: "Published Sites",
            value: data.published_sites ?? 0,
            description: "Live and accessible",
            icon: Layout,
        },
        {
            title: "Draft Sites",
            value: data.draft_sites ?? 0,
            description: "Work in progress",
            icon: Layout,
        },
        {
            title: "Total Pages",
            value: data.total_pages ?? 0,
            description: "Across all sites",
            icon: FileText,
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <Card key={stat.title}>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </span>
                                <Icon className="h-4 w-4 text-muted-foreground"/>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <CardDescription className="text-xs">
                                {stat.description}
                            </CardDescription>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};

