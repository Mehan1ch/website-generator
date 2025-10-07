import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import * as React from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";

const formSchema = z.object({
    currentPassword: z.string().min(8, "Current password must be at least 8 characters long"),
    newPassword: z.string().min(8, "New password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters long"),
})

type PasswordFormProps = {
    className?: string;
} & React.ComponentPropsWithoutRef<"form">;

type PasswordFormSchema = {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}

export function PasswordForm({
                                 className,
                                 ...props
                             }: PasswordFormProps) {

    const form = useForm<PasswordFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        mode: "onBlur",
        reValidateMode: "onBlur",
    })

    //TODO: implement useAPI hook and Tanstack query for better fetching
    const onSubmit = async (data: PasswordFormSchema) => {
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
                        <CardTitle>Password</CardTitle>
                        <CardDescription>
                            Change your password here. After saving, you&apos;ll be logged
                            out.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="grid gap-3">
                            <FormField
                                control={form.control}
                                name="currentPassword"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Current Password</FormLabel>
                                        <FormControl>
                                            <Input id="currentPassword" type="string"
                                                   required {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-3">
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input id="newPassword" type={"password"}
                                                   required {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-3">
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input id={"confirmPassword"} type={"password"}
                                                   required {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type={"submit"}>Save password</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}
