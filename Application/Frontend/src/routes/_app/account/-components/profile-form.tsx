import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {ComponentPropsWithoutRef, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuth} from "@/hooks/use-auth.tsx";
import {Card, CardContent, CardFooter} from "@/components/ui/card.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {toast} from "sonner";
import {UpdateProfileBody, updateProfileFormSchema} from "@/types/account.ts";
import {api} from "@/lib/api/api-client.ts";
import {User} from "lucide-react";

type ProfileFormProps = {
    className?: string;
} & ComponentPropsWithoutRef<"div">;


export function ProfileForm({
                                className,
                                ...props
                            }: ProfileFormProps) {

    const {user, fetchUserContext} = useAuth();
    const [loading, setLoading] = useState(false);
    const updateProfileMutation = api.useMutation("put", "/user/profile-information",
        {
            onSuccess: async () => {
                await fetchUserContext();
                setLoading(false);
                toast.success("Profile updated successfully!");
            },
            onError: (error) => {
                toast.error("Failed to update profile!", {
                    description: error.message
                });
                form.reset();
                setLoading(false);
            }
        });

    const form = useForm<UpdateProfileBody>({
        resolver: zodResolver(updateProfileFormSchema),
        defaultValues: {
            name: user?.name,
            email: user?.email,
        },
        mode: "onBlur",
        reValidateMode: "onBlur",
    });

    return (
        <div className="mx-auto max-w-5xl p-6" {...props}>
            <form className={cn("flex flex-col gap-6", className)}
                  onSubmit={form.handleSubmit((data) => {
                      setLoading(true);
                      updateProfileMutation.mutate({body: data});
                  })}
            >
                <FieldGroup>
                    <Card className="bg-card border p-8">
                        <div className="border-b pb-6">
                            <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
                                <User/>
                                Profile
                            </h2>
                            <p className="text-muted-foreground mt-2 text-sm">
                                Update your account's profile information and email address.
                            </p>
                        </div>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-3">
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
                            </div>
                            <div className="grid gap-3">
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
                                                placeholder="m@example.com"
                                                aria-invalid={fieldState.invalid}
                                                required
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]}/>
                                            )}
                                        </Field>
                                    )}
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={loading}>
                                {loading && <Spinner/>}
                                Save changes
                            </Button>
                        </CardFooter>
                    </Card>
                </FieldGroup>
            </form>
        </div>
    );
}