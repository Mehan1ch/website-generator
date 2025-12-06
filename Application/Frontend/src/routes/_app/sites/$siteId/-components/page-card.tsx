import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useRouter} from "@tanstack/react-router";
import {getDateString} from "@/lib/utils.ts";
import {PageCollectionItem} from "@/types/pages.ts";


export type PageCardProps = {
    siteId: string;
    page: PageCollectionItem
}

export const PageCard = ({siteId, page}: PageCardProps) => {
    const router = useRouter();
    const onCardClick = () => {
        if (page?.id == undefined) return;
        router.navigate({
            to: "/sites/$siteId/pages/$pageId",
            params: {
                siteId: siteId,
                pageId: page.id,
            }
        });
    };


    return <Card
        className={"outline-1 m-2 hover:bg-secondary hover:shadow-lg hover:shadow-primary/25"}
        onClick={onCardClick}>
        <CardHeader>
            <CardTitle className={"flex justify-between"}>
                {page.title}
            </CardTitle>
            <CardDescription>
                {page.url}
            </CardDescription>
        </CardHeader>
        <CardContent className={"h-full"}/>
        <CardFooter className="flex justify-between">
            <p className="text-muted-foreground text-sm">
                Created at: <br/> {getDateString(page.created_at)}
            </p>
            <p className="text-muted-foreground text-sm">
                Updated at: <br/> {getDateString(page.updated_at)}
            </p>
        </CardFooter>
    </Card>;
};
