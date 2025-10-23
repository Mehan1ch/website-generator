import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card.tsx";
import {Field, FieldDescription, FieldError, FieldGroup, FieldLabel,} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";
import {ComponentPropsWithoutRef, useState} from "react";
import {Link, useRouter} from "@tanstack/react-router";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Spinner} from "@/components/ui/spinner.tsx";
import {RegisterBody, registerFormSchema} from "@/types/auth.ts";
import {toast} from "sonner";
import {APIError} from "@/lib/api/api-client.ts";
import {useAuth} from "@/hooks/use-auth.tsx";

type SignupFormProps = {
    className?: string;
    redirect?: string;
} & ComponentPropsWithoutRef<"div">;

export function SignupForm({
                               className,
                               redirect,
                               ...props
                           }: SignupFormProps) {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const {register} = useAuth();

    const form = useForm<RegisterBody>({
        resolver: zodResolver(registerFormSchema),
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
        try {
            await register(data);
            toast.success("Registration successful!");
            router.history.push(redirect || "/");
        } catch (error) {
            toast.error("Registration failed!", {description: (error as APIError).message});
            form.reset();
            setLoading(false);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Create your account</CardTitle>
                    <CardDescription>
                        Enter your email below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="name"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="name">Full Name</FieldLabel>
                                        <Input {...field}
                                               id="name"
                                               type="text"
                                               placeholder="John Doe"
                                               aria-invalid={fieldState.invalid}
                                               required/>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]}/>
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="email"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="email">Email</FieldLabel>
                                        <Input
                                            {...field}
                                            id="email"
                                            type="email"
                                            placeholder="john.doe@example.com"
                                            aria-invalid={fieldState.invalid}
                                            required
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]}/>
                                        )}
                                    </Field>
                                )}
                            />
                            <Field>
                                <Field className="grid grid-cols-2 gap-4">
                                    <Controller
                                        name="password"
                                        control={form.control}
                                        render={({field, fieldState}) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                                <Input {...field} id="password" type="password" required
                                                       aria-invalid={fieldState.invalid}/>
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
                                                <FieldLabel htmlFor="password_confirmation">
                                                    Confirm Password
                                                </FieldLabel>
                                                <Input {...field} id="password_confirmation" type="password" required
                                                       aria-invalid={fieldState.invalid}/>
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]}/>
                                                )}
                                            </Field>
                                        )}
                                    />
                                </Field>
                                <FieldDescription>
                                    Must be at least 8 characters long.
                                </FieldDescription>
                            </Field>
                            <Field>
                                <Button type="submit" disabled={loading}>
                                    {loading && <Spinner/>}
                                    Create Account
                                </Button>
                                <FieldDescription className="text-center">
                                    Already have an account? <Link to={"/login"} search={{
                                    redirect: redirect || "/"
                                }}>Sign in</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
        ;
}
