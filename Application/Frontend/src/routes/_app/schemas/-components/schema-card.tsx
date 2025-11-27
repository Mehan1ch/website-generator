import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {SchemaCollectionItem, SchemaState} from "@/types/schema.ts";
import {useRouter} from "@tanstack/react-router";
import {calculateCardDescription, getDateString} from "@/lib/utils.ts";
import {useAuth} from "@/hooks/use-auth.tsx";
import {StateBadge} from "@/components/blocks/state-badge.tsx";


export type SchemaCardProps = {
    schema: SchemaCollectionItem
}


export const SchemaCard = ({schema}: SchemaCardProps) => {
    const {user} = useAuth();
    const router = useRouter();
    const onCardClick = () => {
        if (schema?.id == undefined) return;
        router.navigate({
            to: "/schemas/$schemaId",
            params: {
                schemaId: schema?.id
            }
        });
    };


    return <Card
        className={"outline-1 hover:bg-secondary hover:shadow-lg hover:shadow-primary/50"}
        onClick={onCardClick}>
        <CardHeader className={"flex justify-between"}>
            <CardTitle className={"text-pretty truncate"}>
                {schema?.name}
            </CardTitle>
            <CardDescription>
                {user?.is_admin && <StateBadge state={schema?.state as SchemaState}/>}
            </CardDescription>
        </CardHeader>
        <CardContent className={"h-full"}>
            {calculateCardDescription(schema?.description)}
        </CardContent>
        {user?.is_admin &&
            <CardFooter className="flex justify-between">
                <p className="text-muted-foreground text-sm">
                    Created at: <br/> {getDateString(schema?.created_at)}
                </p>
                <p className="text-muted-foreground text-sm">
                    Updated at: <br/> {getDateString(schema?.updated_at)}
                </p>
                <p className="text-muted-foreground text-sm">
                    Published at: <br/> {getDateString(schema?.published_at)}
                </p>
            </CardFooter>
        }
    </Card>;
};