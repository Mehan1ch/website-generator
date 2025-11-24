"use client";

import {Edit, MoreHorizontal, Trash2} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import {BackLink} from "@/components/blocks/back-link.tsx";
import {Schema} from "@/types/schema.ts";
import {capitalize, getStateBadgeVariant} from "@/lib/utils.ts";
import {SchemaState} from "@/types/state.ts";
import {SchemaDetailOverview} from "@/routes/_app/schemas/-components/schema-detail-overview.tsx";

type SchemaDetailProps = {
    schema: Schema
}

export default function SchemaDetail({schema}: SchemaDetailProps) {
    return (
        <div className="container mx-auto max-w-6xl">
            {/* Header */}
            <div className="mb-8">
                <BackLink text={"Back to Schemas"}/>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold">{schema.name}</h1>
                            <Badge
                                variant={getStateBadgeVariant(schema.state as SchemaState)}>{capitalize(schema.state || "")}</Badge>
                        </div>
                        <p className="text-muted-foreground">
                            {schema.description}
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <Button>
                            <Edit className="mr-2 h-4 w-4"/>
                            Edit
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <MoreHorizontal className="h-4 w-4"/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4"/>
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
            <SchemaDetailOverview schema={schema}/>
        </div>
    );
}
