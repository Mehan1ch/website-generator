import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuth} from "@/hooks/use-auth.tsx";
import {Link, useRouter} from "@tanstack/react-router";
import {ComponentPropsWithoutRef, useState} from "react";
import {Spinner} from "@/components/ui/spinner.tsx";
import {LoginBody, loginFormSchema} from "@/types/auth.ts";
import {Field, FieldDescription, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {toast} from "sonner";
import {APIError} from "@/lib/api/api-client.ts";

type LoginFormProps = {
    redirect?: string;
    className?: string;
} & ComponentPropsWithoutRef<"div">;

export function LoginForm({
                              className,
                              redirect,
                              ...props
                          }: LoginFormProps) {
    const {login} = useAuth();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const redirectTo: string = redirect || "/";


    const form = useForm<LoginBody>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onBlur",
        reValidateMode: "onBlur",
    });

    const onSubmit = async (data: LoginBody) => {
        setLoading(true);
        try {
            await login(data);
            toast.success("Successfully logged in");
            router.history.push(redirect || "/");
        } catch (error) {
            toast.error("Login failed!", {description: (error as APIError).message});
            form.reset();
            setLoading(false);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="email"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="email">Email address</FieldLabel>
                                        <Input {...field}
                                               id="email"
                                               type="email"
                                               placeholder="john.doe@example.com"
                                               aria-invalid={fieldState.invalid}
                                               required/>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]}/>
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="password"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <div className="flex items-center">
                                            <FieldLabel htmlFor="password">Password</FieldLabel>
                                            <Link to={"/forgot-password"} search={{redirect: redirectTo}}
                                                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                            >
                                                Forgot your password?
                                            </Link>
                                        </div>
                                        <Input {...field}
                                               id="password"
                                               type="password"
                                               aria-invalid={fieldState.invalid}
                                               required/>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]}/>
                                        )}
                                    </Field>
                                )}
                            />

                            <Field>
                                <Button type="submit" disabled={loading}>
                                    {loading && <Spinner/>}
                                    Login
                                </Button>
                                <FieldDescription className="text-center">
                                    Don't have an account?{' '}
                                    <Link to={"/register"} search={{redirect: redirectTo}}>
                                        Sign up
                                    </Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}