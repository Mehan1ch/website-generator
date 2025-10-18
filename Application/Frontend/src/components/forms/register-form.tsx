import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import * as React from "react";
import {useState} from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Link, useRouter} from "@tanstack/react-router";
import {useAuth} from "@/hooks/use-auth.tsx";
import {RegisterBody} from "@/api/models";
import {registerBody} from "@/api/endpoints/authentication/authentication.zod.ts";
import {Spinner} from "@/components/ui/spinner.tsx";

type RegisterFormProps = {
    className?: string;
    redirect?: string;
} & React.ComponentPropsWithoutRef<"form">;

export function RegisterForm({
                                 className,
                                 redirect,
                                 ...props
                             }: RegisterFormProps) {

    const router = useRouter();
    const {register} = useAuth();
    const [loading, setLoading] = useState(false);

    const form = useForm<RegisterBody>({
        resolver: zodResolver(registerBody),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
        mode: "onBlur",
        reValidateMode: "onBlur",
    });

    const onSubmit = async (data: RegisterBody) => {
        setLoading(true);
        const {isError, isSuccess} = await register(data);
        if (isError) {
            form.reset();
            setLoading(false);
        }
        if (isSuccess) {
            router.history.push(redirect || "/");
        }
    };

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
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading && <Spinner/>}
                        Register
                    </Button>
                    <div
                        className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    </div>
                </div>
                <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link to={"/login"} className="underline underline-offset-4" search={{
                        redirect: redirect || "/",
                    }}>
                        Login
                    </Link>
                </div>
            </form>
        </Form>
    );
}