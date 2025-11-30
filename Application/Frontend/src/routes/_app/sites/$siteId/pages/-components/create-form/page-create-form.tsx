import {FieldGroup} from "@/components/ui/field.tsx";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button.tsx";
import {useEffect, useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "@tanstack/react-router";
import {toast} from "sonner";
import {api, APIError} from "@/lib/api/api-client.ts";
import {CreatePageBody, createPageForm} from "@/types/pages.ts";
import {defineStepper} from "@/components/ui/stepper.tsx";
import {Card, CardFooter, CardHeader} from "@/components/ui/card.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";
import {ArrowLeft, ArrowRight, RotateCcw, Save} from "lucide-react";
import {
    PageCreateFormDetails
} from "@/routes/_app/sites/$siteId/pages/-components/create-form/page-create-form-details.tsx";
import {
    PageCreateFormContent
} from "@/routes/_app/sites/$siteId/pages/-components/create-form/page-create-form-content.tsx";
import {
    PageCreateFormReview
} from "@/routes/_app/sites/$siteId/pages/-components/create-form/page-create-form-review.tsx";
import {
    PageCreateFormSchemas
} from "@/routes/_app/sites/$siteId/pages/-components/create-form/page-create-form-schemas.tsx";
import {renderToStaticHTML} from "@/lib/element-utils.tsx";
import {compressAndEncodeBase64, decodeBase64AndDecompress} from "@/lib/utils.ts";
import {SchemaCollectionItem} from "@/types/schema.ts";

type PageCreateFormProps = {
    siteId: string;
    page: number;
}


const {Stepper} = defineStepper(
    {id: "step-1", title: "Details", description: "Enter details",},
    {id: "step-2", title: "Content", description: "Select base content type"},
    {id: "step-3", title: "Schema", description: "Optional"},
    {id: "step-4", title: "Review", description: "Review and create"},
);

const contentOptions = [
    {
        id: '1',
        label: 'Empty page',
        description: 'Create a blank page to start from scratch',
    },
    {
        id: '2',
        label: 'Schema-based page',
        description: 'Create a page based on a predefined schema',
    },
];

export const PageCreateForm = ({siteId, page}: PageCreateFormProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [selectedContentOption, setSelectedContentOption] = useState(contentOptions[0].id);
    const [selectedSchema, setSelectedSchema] = useState<string>("");
    const shouldSkipSchemaStep = selectedContentOption === contentOptions[0].id;
    const createPageMutation = api.useMutation("post", "/api/v1/site/{site_id}/page");

    useEffect(() => {
        if (selectedContentOption === contentOptions[0].id) {
            setSelectedSchema("");
            form.setValue("content", "");
        }
    }, [selectedContentOption]);

    const form = useForm<CreatePageBody>({
        resolver: zodResolver(createPageForm),
        defaultValues: {
            title: "",
            url: "",
            content: "",
            html: "",
        },
        mode: "onBlur",
        reValidateMode: "onBlur",
    });

    const handleSubmit = (data: CreatePageBody) => {
        setLoading(true);
        const loadingToast = toast.loading("Creating page...");
        createPageMutation.mutate({
            params: {
                path: {
                    site_id: siteId,
                }
            },
            body: data
        }, {
            onSuccess: (data) => {
                toast.dismiss(loadingToast);
                toast.success("Page created successfully.");
                router.navigate({
                    to: "/sites/$siteId/pages/$pageId",
                    params: {
                        siteId: siteId,
                        pageId: data?.data?.id || "",
                    }
                });
            },
            onError: (err: APIError) => {
                setLoading(false);
                toast.dismiss(loadingToast);
                toast.error("Failed to create page: ", {
                    description: err.message,
                });
            }
        });
    };

    return <div className="max-w-5xl p-6">
        <form className={"flex flex-col gap-6"}
              onSubmit={form.handleSubmit((data: CreatePageBody) => {
                  const decodedContent = decodeBase64AndDecompress(data.content || "");
                  const htmlRaw = renderToStaticHTML(decodedContent);
                  data.html = compressAndEncodeBase64(htmlRaw);
                  handleSubmit(data);
              })}>
            <FieldGroup>
                <Stepper.Provider className="space-y-4">
                    {({methods}) => (
                        <Card className="bg-card border p-8">
                            <CardHeader>
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
                                        Create Page
                                    </h2>
                                    <p className={"text-muted-foreground"}>
                                        Step {methods.all.indexOf(methods.current) + 1} of {methods.all.length}
                                    </p>
                                </div>
                                <Stepper.Navigation>
                                    {methods.all.map((step) => (
                                        <Stepper.Step of={step.id} onClick={async () => {
                                            const valid = await form.trigger();
                                            if (!valid) return;
                                            if (step.id === "step-3" && shouldSkipSchemaStep) {
                                                methods.goTo("step-4");
                                                return;
                                            }
                                            methods.goTo(step.id);
                                        }}>
                                            <Stepper.Title>{step.title}</Stepper.Title>
                                            <Stepper.Description>{step.description}</Stepper.Description>
                                        </Stepper.Step>
                                    ))}
                                </Stepper.Navigation>
                            </CardHeader>
                            {methods.switch({
                                "step-1": () => <PageCreateFormDetails form={form}/>,
                                "step-2": () => <PageCreateFormContent contentOptions={contentOptions}
                                                                       selectedContentOption={selectedContentOption}
                                                                       setSelectedContentOption={setSelectedContentOption}/>,
                                "step-3": () => <PageCreateFormSchemas page={page}
                                                                       selectedSchema={selectedSchema}
                                                                       setSelectedSchema={(schema: SchemaCollectionItem) => {
                                                                           form.setValue("content", schema.content || "");
                                                                           setSelectedSchema(schema.id || "");
                                                                       }}/>,
                                "step-4": () => <PageCreateFormReview form={form}/>,
                            })}
                            <CardFooter className={"flex items-end justify-end"}>
                                <Stepper.Controls>
                                    {!methods.isFirst && (
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            onClick={() => {
                                                if (methods.current.id === "step-4" && shouldSkipSchemaStep) {
                                                    methods.goTo("step-2");
                                                    return;
                                                }
                                                methods.prev();
                                            }}
                                            disabled={methods.isFirst}
                                        >
                                            <ArrowLeft/>
                                            Previous
                                        </Button>
                                    )}
                                    {!methods.isLast &&
                                        <Button type="button" onClick={async () => {
                                            const valid = await form.trigger();
                                            if (!valid) return;
                                            const currentIndex = methods.all.indexOf(methods.current);
                                            const nextStep = methods.all[currentIndex + 1];
                                            if (nextStep?.id === "step-3" && shouldSkipSchemaStep) {
                                                methods.goTo("step-4");
                                                return;
                                            }
                                            methods.next();
                                        }}>
                                            Next
                                            <ArrowRight/>
                                        </Button>
                                    }
                                    {methods.isLast && (
                                        <>
                                            <Button type="button" onClick={() => {
                                                form.reset();
                                                setSelectedContentOption(contentOptions[0].id);
                                                methods.reset();
                                            }}>
                                                <RotateCcw/>
                                                Reset
                                            </Button>
                                            <Button type="submit" disabled={loading}>
                                                {loading ? <Spinner/> : <Save/>}
                                                {loading ? "Creating..." : "Create Page"}
                                            </Button>
                                        </>
                                    )}
                                </Stepper.Controls>
                            </CardFooter>
                        </Card>
                    )}
                </Stepper.Provider>
            </FieldGroup>
        </form>
    </div>;
};