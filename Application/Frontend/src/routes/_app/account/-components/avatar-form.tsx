import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {ComponentPropsWithoutRef, useEffect, useRef, useState} from "react";
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

    // native file input ref and object URL ref for cleanup
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const objectUrlRef = useRef<string | null>(null);

    // preview: either the selected file object URL or user's current avatar
    const [preview, setPreview] = useState<string | null>(user?.avatar ?? null);


    const avatarMutation = api.useMutation("post", "/api/v1/avatar", {
            header: {
                "Content-Type": "multipart/form-data"
            },
            onSuccess: async () => {
                await fetchUserContext();
                clearFileInputAndPreview();
                setLoading(false);
                toast.success("Avatar updated successfully!");
            },
            onError: (error) => {
                toast.error("Failed to update avatar!", {
                    description: (error as APIError).message
                });
                form.reset();
                clearFileInputAndPreview();
                setLoading(false);
            }
        }
    );

    useEffect(() => {
        // keep preview in sync if user changes (e.g. after fetchUserContext)
        setPreview(user?.avatar ?? null);
    }, [user?.avatar]);

    useEffect(() => {
        return () => {
            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
                objectUrlRef.current = null;
            }
        };
    }, []);

    // helper to clear native input + preview
    const clearFileInputAndPreview = () => {
        if (fileInputRef.current) fileInputRef.current.value = "";
        if (objectUrlRef.current) {
            URL.revokeObjectURL(objectUrlRef.current);
            objectUrlRef.current = null;
        }
        setPreview(user?.avatar ?? null);
    };


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
            clearFileInputAndPreview();
            form.reset();
            return;
        }
        const formData = new FormData();
        formData.append("avatar", data.avatar);
        avatarMutation.mutate({body: formData as unknown as any});
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
                                    <AvatarImage src={preview!} alt={user?.name}/>
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
                                                ref={(el) => {
                                                    field.ref(el);
                                                    fileInputRef.current = el;
                                                }}
                                                accept="image/*"
                                                aria-invalid={fieldState.invalid}
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    // revoke previous object URL
                                                    if (objectUrlRef.current) {
                                                        URL.revokeObjectURL(objectUrlRef.current);
                                                        objectUrlRef.current = null;
                                                    }
                                                    if (file) {
                                                        const url = URL.createObjectURL(file);
                                                        objectUrlRef.current = url;
                                                        setPreview(url);
                                                        field.onChange(file);
                                                    } else {
                                                        setPreview(user?.avatar ?? null);
                                                        field.onChange(undefined);
                                                    }
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