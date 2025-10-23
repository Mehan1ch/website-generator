import {Item, ItemActions, ItemContent, ItemMedia, ItemTitle} from "@/components/ui/item.tsx";
import {BadgeCheckIcon, BadgeXIcon} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useAuth} from "@/hooks/use-auth.tsx";
import {api} from "@/lib/api/api-client.ts";
import {useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {Spinner} from "@/components/ui/spinner.tsx";
import {toast} from "sonner";

export function EmailVerificationBadge() {
    const {user} = useAuth();
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();
    const emailVerificationNotificationOptions = api.queryOptions("post", "/email/verification-notification");

    return <Item variant="outline" size="default" className="bg-muted m-y-4">
        <ItemMedia>
            {user?.email_verified_at ? <BadgeCheckIcon className="size-5"/> : <BadgeXIcon/>}
        </ItemMedia>
        <ItemContent>
            <ItemTitle>
                {user?.email_verified_at ? "Your email has been verified." : "Please verify your email address."}
            </ItemTitle>
        </ItemContent>
        {user?.email_verified_at === null &&
            <ItemActions>
                <Button onClick={async () => {
                    setLoading(true);
                    await queryClient.fetchQuery(emailVerificationNotificationOptions);
                    toast.success("Verification link sent to your email address.");
                    setLoading(false);
                }}>
                    {loading && <Spinner/>}
                    {loading ? "Sending" : "Resend link"}
                </Button>
            </ItemActions>
        }
    </Item>;
}