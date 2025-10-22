import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Link, useRouter} from "@tanstack/react-router";
import {ComponentPropsWithoutRef, useState} from "react";
import {Spinner} from "@/components/ui/spinner.tsx";
import {Field, FieldDescription, FieldError, FieldGroup, FieldLabel} from "../ui/field";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {toast} from "sonner";
import {ResetPasswordBody, resetPasswordFormSchema} from "@/types/auth.ts";
import {api} from "@/lib/api/api-client.ts";

type ResetPasswordFormProps = {
    redirect?: string;
    className?: string;
    token?: string;
    email?: string;
} & ComponentPropsWithoutRef<"div">;

export function ResetPasswordForm({
                                      redirect,
                                      className,
                                      token,
                                      email,
                                      ...props
                                  }: ResetPasswordFormProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const redirectTo: string = redirect || "/";
    const resetPasswordMutation = api.useMutation(
        "post",
        "/reset-password",
        {
            onSuccess: () => {
                setLoading(false);
                toast.success("Password reset link sent successfully!");
                router.history.push("/");
            },
            onError: (error) => {
                setLoading(false);
                toast.error("Error in password reset!", {description: error.message});
            }
        }
    );


    const form = useForm<ResetPasswordBody>({
        resolver: zodResolver(resetPasswordFormSchema),
        defaultValues: {
            email: email,
            password: "",
            password_confirmation: "",
            token: token,
        },
        mode: "onBlur",
        reValidateMode: "onBlur",
    });

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                    <CardDescription>
                        Reset your password by entering your email and new password below.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit((data) => {
                        setLoading(true);
                        resetPasswordMutation.mutate({body: data});
                    })}>
                        <FieldGroup>
                            <Controller
                                name="email"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <Input {...field}
                                               id="email"
                                               type="hidden"
                                               required/>
                                    </Field>
                                )}
                            />
                            <Controller
                                name="password"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="password">Password</FieldLabel>
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
                            <Controller
                                name="password_confirmation"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="password_confirmation">Password Confirmation</FieldLabel>
                                        <Input {...field}
                                               id="password_confirmation"
                                               type="password"
                                               aria-invalid={fieldState.invalid}
                                               required/>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]}/>
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="token"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <Input {...field}
                                               id="token"
                                               type="hidden"
                                               required/>
                                    </Field>
                                )}
                            />
                            <Field>
                                <Button type="submit" disabled={loading}>
                                    {loading && <Spinner/>}
                                    Reset Password
                                </Button>
                                <FieldDescription className="text-center">
                                    <Link to={"/login"} search={{redirect: redirectTo}}>
                                        Back to login
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