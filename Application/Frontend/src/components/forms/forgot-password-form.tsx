import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Link} from "@tanstack/react-router";
import {ComponentPropsWithoutRef, useState} from "react";
import {Spinner} from "@/components/ui/spinner.tsx";
import {ForgotPasswordBody, forgotPasswordFormSchema} from "@/types/auth.ts";
import {Field, FieldDescription, FieldError, FieldGroup, FieldLabel} from "../ui/field";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useApi} from "@/hooks/use-api.tsx";
import {toast} from "sonner";

type ForgotPasswordFormProps = {
    redirect?: string;
    className?: string;
} & ComponentPropsWithoutRef<"div">;

export function ForgotPasswordForm({
                                       className,
                                       redirect,
                                       ...props
                                   }: ForgotPasswordFormProps) {
    const [loading, setLoading] = useState(false);
    const redirectTo: string = redirect || "/";
    const api = useApi();
    const forgotPasswordMutation = api.useMutation(
        "post",
        "/forgot-password",
        {
            onSuccess: () => {
                setLoading(false);
                toast.success("Password reset link sent successfully!");
            },
            onError: (error) => {
                setLoading(false);
                toast.error("Error in password reset!", {description: error.message});
            }
        }
    );


    const form = useForm<ForgotPasswordBody>({
        resolver: zodResolver(forgotPasswordFormSchema),
        defaultValues: {
            email: "",
        },
        mode: "onBlur",
        reValidateMode: "onBlur",
    });

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Forgot Password?</CardTitle>
                    <CardDescription>
                        Enter your email below associated with your account to reset your password
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit((data) => {
                        setLoading(true);
                        forgotPasswordMutation.mutate({body: data});
                    })}>
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