import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import * as React from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuth} from "@/hooks/use-auth.tsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.email("Invalid email address"),
})

type ProfileFormProps = {
    className?: string;
} & React.ComponentPropsWithoutRef<"form">;

type ProfileFormSchema = {
    name: string
    email: string
}

export function ProfileForm({
                                className,
                                ...props
                            }: ProfileFormProps) {

    const {user} = useAuth();

    const form = useForm<ProfileFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user?.name,
            email: user?.email,
        },
        mode: "onBlur",
        reValidateMode: "onBlur",
    })

    //TODO: implement useAPI hook and Tanstack query for better fetching
    const onSubmit = async (data: ProfileFormSchema) => {
        try {
            //await login(data);
            //router.history.push(redirect || "/");
        } catch {
            form.reset();
        }
    }

    return (
        <Form {...form} {...props}>
            <form className={cn("flex flex-col gap-6", className)}
                  onSubmit={form.handleSubmit(onSubmit)}
            >
                <Card>
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                        <CardDescription>
                            Make changes to your account here. Click save when you&apos;re
                            done.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="grid gap-3">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input id="name" type="string" placeholder="John Doe" required {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-3">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <div className="flex items-center">
                                            <FormLabel>Email address</FormLabel>
                                        </div>
                                        <FormControl>
                                            <Input id="email" type="email" placeholder="john.doe@example.com"
                                                   required {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        {/* TODO: Add loadercircle or spinner here if needed and set processing state */}
                        <Button type="submit">Save changes</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}