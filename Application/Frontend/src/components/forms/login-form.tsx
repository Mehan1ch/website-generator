import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import * as React from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuth} from "@/hooks/use-auth.tsx";
import {Link, useRouter} from "@tanstack/react-router";
import {LoginCredentials} from "@/types/auth.ts";

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long")
})

export function LoginForm({
                              className,
                              ...props
                          }: React.ComponentPropsWithoutRef<"form">) {
    const {login} = useAuth();
    const router = useRouter();

    const form = useForm<LoginCredentials>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onBlur",
        reValidateMode: "onBlur",
    })

    const onSubmit = async (data: LoginCredentials) => {
        try {
            await login(data);
            router.navigate({to: "/"});
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
                    <h1 className="text-2xl font-bold">Login to your account</h1>
                    <p className="text-balance text-sm text-muted-foreground">
                        Enter your email below to login to your account
                    </p>
                </div>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input id="email" type="email" placeholder="m@example.com" required {...field}/>
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
                                    <div className="flex items-center">
                                        <FormLabel>Password</FormLabel>
                                        <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                                            Forgot your password?
                                        </a>
                                    </div>
                                    <FormControl>
                                        <Input id="password" type="password" required {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                    <div
                        className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    </div>
                </div>
                <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link to={"/register"} className="underline underline-offset-4">
                        Sign up
                    </Link>
                </div>
            </form>
        </Form>
    )
}