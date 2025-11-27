import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useRouter} from "@tanstack/react-router";
import {getDateString} from "@/lib/utils.ts";
import {PageCollectionItem} from "@/types/pages.ts";


export type PageCardProps = {
    page: PageCollectionItem
}

export const PageCard = ({page}: PageCardProps) => {
    const router = useRouter();
    const onCardClick = () => {
        if (page?.id == undefined) return;
        router.navigate({
            to: "/sites/$siteId",
            params: {
                siteId: page?.id
            }
        });
    };


    return <Card
        className={"outline-1 m-2 hover:bg-secondary hover:shadow-lg hover:shadow-primary/50"}
        onClick={onCardClick}>
        <CardHeader>
            <CardTitle className={"flex justify-between"}>
                {page?.title}
            </CardTitle>
            <CardDescription>
                {page?.url}
            </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
            <p className="text-muted-foreground text-sm">
                Created at: <br/> {getDateString(page?.created_at)}
            </p>
            <p className="text-muted-foreground text-sm">
                Updated at: <br/> {getDateString(page?.updated_at)}
            </p>
        </CardFooter>
    </Card>;
};
