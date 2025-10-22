import {createFileRoute} from '@tanstack/react-router';
import {TypographyH4} from "@/components/ui/typography/typography-h4.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {ProfileForm} from "@/routes/_app/account/-components/profile-form.tsx";
import {PasswordForm} from "@/routes/_app/account/-components/password-form.tsx";
import {DeleteAccountForm} from "@/routes/_app/account/-components/delete-account-form.tsx";

export const Route = createFileRoute('/_app/account/')({
    beforeLoad: () => {
        return {
            getTitle: () => 'Account',
        };
    },
    component: Account,
});

function Account() {

    return <div className="m-2 p-4">
        <header className="flex h-16 shrink-0 items-center gap-2">
            <div>
                <TypographyH4>Settings</TypographyH4>
                <p className="text-muted-foreground">Manage your profile and account settings</p>
            </div>
        </header>
        <div className="flex lg:w-1/2 w-full flex-col gap-6">
            <Tabs defaultValue="profile">
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                    <TabsTrigger value="delete">Delete</TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                    <ProfileForm/>
                </TabsContent>
                <TabsContent value="password">
                    <PasswordForm/>
                </TabsContent>
                <TabsContent value="delete">
                    <DeleteAccountForm/>
                </TabsContent>
            </Tabs>
        </div>
    </div>;
}
