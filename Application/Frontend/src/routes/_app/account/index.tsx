import {createFileRoute, useNavigate} from '@tanstack/react-router';
import Appearance from "@/routes/_app/account/-components/appearance.tsx";
import {ProfileForm} from "@/routes/_app/account/-components/profile-form.tsx";
import {AvatarUpload} from "@/routes/_app/account/-components/avatar-upload.tsx";
import {EmailVerificationBadge} from "@/routes/_app/account/-components/email-verification-badge.tsx";
import {DeleteAccountForm} from "@/routes/_app/account/-components/delete-account-form.tsx";
import PasswordForm from "@/routes/_app/account/-components/password-form.tsx";
import {Tabs, TabsContent, TabsContents, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {RouteTitle} from "@/components/blocks/route-title.tsx";
import {z} from "zod";

type AccountTab = "appearance" | "profile" | "avatar" | "verification" | "password" | "delete";

const accountSearchSchema = z.object({
    tab: z.literal(["appearance", "profile", "avatar", "verification", "password", "delete"]).default("appearance"),
});

export const Route = createFileRoute('/_app/account/')({
    validateSearch: accountSearchSchema,
    beforeLoad: () => {
        return {
            getTitle: () => 'Account',
        };
    },
    component: Account,
});

function Account() {
    const {tab} = Route.useSearch();
    const navigate = useNavigate({from: Route.fullPath});

    const handleTabChange = async (value: AccountTab) => {
        await navigate({
            search: (old) => ({
                ...old,
                tab: value,
            }),
        });
    };

    return <div>
        <RouteTitle title={"Settings"} description={"Manage your profile and account settings"}/>
        <div className="flex lg:w-1/2 w-full flex-col gap-6">
            <Tabs value={tab} onValueChange={handleTabChange}>
                <TabsList>
                    <TabsTrigger value="appearance">Appearance</TabsTrigger>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="avatar">Avatar</TabsTrigger>
                    <TabsTrigger value="verification">Verification</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                    <TabsTrigger value="delete">Delete</TabsTrigger>
                </TabsList>
                <TabsContents>
                    <TabsContent value="appearance">
                        <Appearance/>
                    </TabsContent>
                    <TabsContent value="profile">
                        <ProfileForm/>
                    </TabsContent>
                    <TabsContent value="avatar">
                        <AvatarUpload/>
                    </TabsContent>
                    <TabsContent value="verification">
                        <EmailVerificationBadge/>
                    </TabsContent>
                    <TabsContent value="password">
                        <PasswordForm/>
                    </TabsContent>
                    <TabsContent value="delete">
                        <DeleteAccountForm/>
                    </TabsContent>
                </TabsContents>
            </Tabs>
        </div>
    </div>;
}
