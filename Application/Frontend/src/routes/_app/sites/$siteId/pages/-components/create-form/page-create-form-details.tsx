import {Field, FieldError, FieldLabel} from "@/components/ui/field.tsx";
import {CardContent} from "@/components/ui/card.tsx";
import {Controller, useForm} from "react-hook-form";
import {Input} from "@/components/ui/input.tsx";
import {CreatePageBody} from "@/types/pages.ts";

type PageCreateFormDetailsProps = {
    form: ReturnType<typeof useForm<CreatePageBody>>;
}

export const PageCreateFormDetails = ({form}: PageCreateFormDetailsProps) => {
    return <CardContent className="grid gap-6">
        <div className="grid gap-3">
            <Controller
                name="title"
                control={form.control}
                render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="title">Title</FieldLabel>
                        <Input {...field}
                               id="title"
                               type="text"
                               placeholder="About page"
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
                name="url"
                control={form.control}
                render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="url">Url</FieldLabel>
                        <Input {...field}
                               id="url"
                               type="text"
                               placeholder="/about"
                               aria-invalid={fieldState.invalid}
                               required/>
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]}/>
                        )}
                    </Field>
                )}
            />
        </div>
    </CardContent>;
};