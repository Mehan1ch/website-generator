import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {ComponentPropsWithoutRef, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {AvatarBody, avatarFormSchema} from "@/types/account.ts";
import {useAuth} from "@/hooks/use-auth.tsx";
import {api, APIError} from "@/lib/api/api-client.ts";
import {toast} from "sonner";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";

type AvatarFormProps = {
    className?: string;
} & ComponentPropsWithoutRef<"div">;

export function AvatarForm({
                               className,
                               ...props
                           }: AvatarFormProps) {

    const [loading, setLoading] = useState(false);
    const {user, fetchUserContext} = useAuth();
    const avatarMutation = api.useMutation("post", "/api/user/avatar", {
            header: {
                "Content-Type": "multipart/form-data"
            },
            onSuccess: async () => {
                await fetchUserContext();
                setLoading(false);
                toast.success("Avatar updated successfully!");
            },
            onError: (error) => {
                toast.error("Failed to update avatar!", {
                    description: (error as APIError).message
                });
                form.reset();
                setLoading(false);
            }
        }
    );


    const form = useForm<AvatarBody>({
        resolver: zodResolver(avatarFormSchema),
        defaultValues: {
            avatar: undefined,
        },
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    });

    const onSubmit = async (data: AvatarBody) => {
        setLoading(true);
        console.log(data);
        if (!data.avatar) {
            setLoading(false);
            form.reset();
            return;
        }
        const formData = new FormData();
        formData.append("avatar", data.avatar);
        avatarMutation.mutate({body: formData});
    };

    return (
        <div {...props}>
            <form className={cn("flex flex-col gap-6", className)}
                  onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Card>
                        <CardHeader>
                            <CardTitle>Avatar</CardTitle>
                            <CardDescription>
                                Update your profile picture.
                            </CardDescription>
                            <CardAction>
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user?.avatar} alt={user?.name}/>
                                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>
                            </CardAction>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-3">
                                <Controller
                                    name="avatar"
                                    control={form.control}
                                    render={({field, fieldState}) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="avatar">Avatar</FieldLabel>
                                            <Input
                                                id="avatar"
                                                type="file"
                                                ref={field.ref}
                                                accept="image/*"
                                                aria-invalid={fieldState.invalid}
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    field.onChange(file);
                                                }}
                                                required/>
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
                                Save avatar
                            </Button>
                        </CardFooter>
                    </Card>
                </FieldGroup>
            </form>
        </div>
    );
}