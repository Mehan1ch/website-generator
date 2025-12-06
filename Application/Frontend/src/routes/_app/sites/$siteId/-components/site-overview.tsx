import {Site} from "@/types/site.ts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {getDateString} from "@/lib/utils.ts";
import {Separator} from "@/components/ui/separator.tsx";

type SiteOverviewProps = {
    site: Site;
}

export const SiteOverview = ({site}: SiteOverviewProps) => {
    return <div className="grid gap-6 lg:grid-cols-2">
        <Card className="lg:col-span-1 max-w-3xl">
            <CardHeader>
                <CardTitle>Site data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <p className="text-sm font-medium mb-2">Subdomain</p>
                    <p className="text-muted-foreground text-sm">
                        {site.subdomain}
                    </p>
                </div>
                <div>
                    <p className="text-sm font-medium mb-2">Number of pages</p>
                    <p className="text-muted-foreground text-sm">
                        {site.number_of_pages}
                    </p>
                </div>
                <div>
                    <p className="text-sm font-medium mb-2">Description</p>
                    <p className="text-muted-foreground text-sm">
                        {site.description || "No description available for this site."}
                    </p>
                </div>

            </CardContent>
        </Card>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Metadata</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                    <div>
                        <p className="text-muted-foreground mb-1">Created</p>
                        <p className="font-medium">{getDateString(site.created_at)}</p>
                    </div>
                    <Separator/>
                    <div>
                        <p className="text-muted-foreground mb-1">Last Modified</p>
                        <p className="font-medium">{getDateString(site.created_at)}</p>
                    </div>
                    <Separator/>
                    <div>
                        <p className="text-muted-foreground mb-1">Last Published</p>
                        <p className="font-medium">{getDateString(site.published_at)}</p>
                    </div>
                    <Separator/>
                    <div>
                        <p className="text-muted-foreground mb-1">Schema ID</p>
                        <p className="font-mono text-xs">{site.id}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>;
};