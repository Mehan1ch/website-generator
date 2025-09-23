import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import * as React from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Link, useRouter} from "@tanstack/react-router";
import {RegisterCredentials} from "@/types/auth.ts";
import {useAuth} from "@/hooks/use-auth.tsx";

const formSchema = z.object({
    name: z.string().max(255, "Name must be at most 255 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    password_confirmation: z.string().min(8, "Password confirmation must be at least 8 characters long"),
}).superRefine(({password, password_confirmation}, ctx) => {
    if (password !== password_confirmation) {
        ctx.addIssue({
            path: ["password_confirmation"],
            code: z.ZodIssueCode.custom,
            message: "Passwords do not match",
        })
    }
});

export function RegisterForm({
                                 className,
                                 ...props
                             }: React.ComponentPropsWithoutRef<"form">) {

    const router = useRouter();
    const {register} = useAuth();

    const form = useForm<RegisterCredentials>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
        mode: "onBlur",
        reValidateMode: "onBlur",
    })

    const onSubmit = async (data: RegisterCredentials) => {
        try {
            await register(data);
            await router.navigate({to: "/login"});
        } catch {
            form.reset();
        }
    }

    return (
        <Form {...form} {...props}>
            <form className={cn("flex flex-col gap-6", className)}
                  onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Register to the application</h1>
                    <p className="text-balance text-sm text-muted-foreground">
                        Enter your account details below to register
                    </p>
                </div>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input id="name" type="text" placeholder="johndoe" required {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input id="email" type="email" placeholder="m@example.com"
                                               required {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input id="password" type="password" required {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="password_confirmation"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password confirmation</FormLabel>
                                    <FormControl>
                                        <Input id="password_confirmation" type="password" required {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        {/* Add loadercircle or spinner here if needed and set processing state */}
                        Register
                    </Button>
                    <div
                        className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    </div>
                </div>
                <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link to={"/login"} className="underline underline-offset-4">
                        Login
                    </Link>
                </div>
            </form>
        </Form>
    )
}