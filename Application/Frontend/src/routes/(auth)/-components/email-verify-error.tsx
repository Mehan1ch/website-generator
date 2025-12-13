import {Item, ItemActions, ItemContent, ItemMedia, ItemTitle} from "@/components/ui/item.tsx";
import {BadgeXIcon} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "@tanstack/react-router";

export const EmailVerifyError = () => {
    return <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <Item variant="outline" size="default" className="bg-background">
            <ItemMedia>
                <BadgeXIcon className="size-5"/>
            </ItemMedia>
            <ItemContent>
                <ItemTitle>Email verification failed</ItemTitle>
            </ItemContent>
            <ItemActions>
                <Button asChild>
                    <Link to={"/account"}>Go to account settings</Link>
                </Button>
            </ItemActions>
        </Item>
    </div>;
};