import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Schema} from "@/types/schema.ts";
import {getDateString} from "@/lib/utils.ts";
import {Preview} from "@/routes/_app/editor/-utils/preview.tsx";

type SchemaDetailOverviewProps = {
    schema: Schema
}

export const SchemaDetailOverview = async ({schema}: SchemaDetailOverviewProps) => {
    return <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Schema Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Preview content={schema.content}/>
                </div>
                <div>
                    <p className="text-sm font-medium mb-2">Description</p>
                    <p className="text-muted-foreground text-sm">
                        {schema.description || "No description available for this page schema."}
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
                        <p className="font-medium">{getDateString(schema.created_at)}</p>
                    </div>
                    <Separator/>
                    <div>
                        <p className="text-muted-foreground mb-1">Last Modified</p>
                        <p className="font-medium">{getDateString(schema.created_at)}</p>
                    </div>
                    <Separator/>
                    <div>
                        <p className="text-muted-foreground mb-1">Last Published</p>
                        <p className="font-medium">{getDateString(schema.published_at)}</p>
                    </div>
                    <Separator/>
                    <div>
                        <p className="text-muted-foreground mb-1">Schema ID</p>
                        <p className="font-mono text-xs">{schema.id}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>;
};