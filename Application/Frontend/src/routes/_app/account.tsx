import {createFileRoute} from '@tanstack/react-router'
import {TypographyH4} from "@/components/ui/typography/typography-h4.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {ProfileForm} from "@/components/forms/profile-form.tsx";
import {PasswordForm} from "@/components/forms/password-form.tsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircleIcon} from "lucide-react";

export const Route = createFileRoute('/_app/account')({
    beforeLoad: () => {
        return {
            getTitle: () => 'Account',
        }
    },
    component: Account,
})

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
                    <Card>
                        <CardHeader>
                            <CardTitle>Delete account</CardTitle>
                            <CardDescription>
                                Delete your account and all of its resources
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-2">
                            <Alert variant={"destructive"}>
                                <AlertCircleIcon/>
                                <AlertTitle>Warning</AlertTitle>
                                <AlertDescription>
                                    This action is irreversible. Please proceed with caution.
                                </AlertDescription>
                            </Alert>
                        </CardContent>
                        <CardFooter>
                            {/* TODO: Add loader circle or spinner here if needed and set processing state */}
                            <Button variant={"destructive"}>Delete Account</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    </div>
}
