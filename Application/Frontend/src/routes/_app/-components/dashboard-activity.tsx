import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {DashboardData} from "@/types/dashboard.ts";
import {Activity, Clock, Globe} from "lucide-react";

type DashboardActivityProps = {
    data: DashboardData;
}

export const DashboardActivity = ({data}: DashboardActivityProps) => {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            {data.recent_activity && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5"/>
                            Recent Activity
                        </CardTitle>
                        <CardDescription>
                            Your most recently updated site
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                <Globe className="h-5 w-5 text-primary"/>
                            </div>
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {data.recent_activity.name}
                                </p>
                                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3"/>
                                    Updated {data.recent_activity.updated_at}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {data.latest_site && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5"/>
                            Latest Site
                        </CardTitle>
                        <CardDescription>
                            Your most recently created site
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                <Globe className="h-5 w-5 text-primary"/>
                            </div>
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {data.latest_site.name}
                                </p>
                                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3"/>
                                    Created {data.latest_site.created_at}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

