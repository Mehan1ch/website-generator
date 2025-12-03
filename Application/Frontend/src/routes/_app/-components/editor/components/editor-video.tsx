import {useNode} from "@craftjs/core";
import {Controller, useForm} from "react-hook-form";
import {CommonDefaults, CommonEditorSettingsType} from "@/types/editor-settings.ts";
import {CommonSettings} from "@/routes/_app/-components/editor/blocks/common-settings.tsx";
import {cn} from "@/lib/utils.ts";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {Field, FieldLabel} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import {Video as VideoIcon} from "lucide-react";

type VideoType = "youtube" | "url";

type EditorVideoProps = CommonEditorSettingsType & {
    src: string;
    type: VideoType;
    width?: number;
    height?: number;
    autoplay: boolean;
    controls: boolean;
    loop: boolean;
    muted: boolean;
    className?: string;
};

// Helper to extract YouTube video ID
const getYouTubeEmbedUrl = (url: string): string => {
    const videoIdMatch = url.match(
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    if (videoIdMatch && videoIdMatch[1]) {
        return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
    }
    return url;
};

export const EditorVideo = ({
                                src = "",
                                type = "youtube",
                                width,
                                height = 400,
                                autoplay = false,
                                controls = true,
                                loop = false,
                                muted = false,
                                className,
                                margin_top = 0,
                                margin_bottom = 0,
                                margin_left = 0,
                                margin_right = 0,
                                padding_top = 0,
                                padding_bottom = 0,
                                padding_left = 0,
                                padding_right = 0,
                            }: EditorVideoProps) => {
    const {
        connectors: {connect, drag},
    } = useNode();

    const renderVideo = () => {
        // Show placeholder if no valid URL is provided
        if (!src || src.trim() === "") {
            return (
                <div
                    className="w-full rounded-md bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center"
                    style={{
                        width: width ? `${width}px` : "100%",
                        height: height ? `${height}px` : "400px",
                    }}
                >
                    <div className="text-center text-gray-500 dark:text-gray-400 p-4">
                        <VideoIcon className="h-12 w-12 mx-auto mb-2 opacity-50"/>
                        <p className="text-sm font-medium">No video URL set</p>
                        <p className="text-xs mt-1">
                            {type === "youtube"
                                ? "Add a YouTube URL in settings"
                                : "Add a video URL in settings"}
                        </p>
                    </div>
                </div>
            );
        }

        if (type === "youtube") {
            const embedUrl = getYouTubeEmbedUrl(src);

            // Check if we got a valid YouTube embed URL
            if (!embedUrl.includes("youtube.com/embed/")) {
                return (
                    <div
                        className="w-full rounded-md bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-red-300 dark:border-red-600 flex items-center justify-center"
                        style={{
                            width: width ? `${width}px` : "100%",
                            height: height ? `${height}px` : "400px",
                        }}
                    >
                        <div className="text-center text-red-500 dark:text-red-400 p-4">
                            <VideoIcon className="h-12 w-12 mx-auto mb-2 opacity-50"/>
                            <p className="text-sm font-medium">Invalid YouTube URL</p>
                            <p className="text-xs mt-1">Please check the URL in settings</p>
                        </div>
                    </div>
                );
            }

            const params = new URLSearchParams();
            if (autoplay) {
                params.append("autoplay", "1");
                params.append("mute", "1");
            }
            if (!controls) {
                params.append("controls", "0");
            }
            if (loop) {
                params.append("loop", "1");
            }
            if (muted && !autoplay) {
                params.append("mute", "1");
            }

            const fullUrl = params.toString() ? `${embedUrl}?${params.toString()}` : embedUrl;

            return (
                <iframe
                    src={fullUrl}
                    className="w-full rounded-md"
                    style={{
                        width: width ? `${width}px` : "100%",
                        height: height ? `${height}px` : "400px",
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            );
        }

        // Direct video URL
        return (
            <video
                src={src}
                className="w-full rounded-md"
                style={{
                    width: width ? `${width}px` : "100%",
                    height: height ? `${height}px` : "auto",
                }}
                autoPlay={autoplay}
                controls={controls}
                loop={loop}
                muted={muted}
            >
                Your browser does not support the video tag.
            </video>
        );
    };

    return (
        <div
            ref={(ref) => {
                connect(drag(ref!));
            }}
            className={cn("w-full", className)}
            style={{
                marginTop: margin_top ? `${margin_top}px` : undefined,
                marginBottom: margin_bottom ? `${margin_bottom}px` : undefined,
                marginLeft: margin_left ? `${margin_left}px` : undefined,
                marginRight: margin_right ? `${margin_right}px` : undefined,
                paddingTop: padding_top ? `${padding_top}px` : undefined,
                paddingBottom: padding_bottom ? `${padding_bottom}px` : undefined,
                paddingLeft: padding_left ? `${padding_left}px` : undefined,
                paddingRight: padding_right ? `${padding_right}px` : undefined,
            }}
        >
            {renderVideo()}
        </div>
    );
};

const VideoSettings = () => {
    const {
        actions: {setProp},
        props,
    } = useNode((node) => ({
        props: node.data.props as EditorVideoProps,
    }));

    const form = useForm<{ props: EditorVideoProps }>({
        defaultValues: {
            props,
        },
    });

    return (
        <form className="flex flex-col gap-4">
            <CommonSettings
                control={form.control}
                setProp={setProp}
                currentProps={props}
                customSettings={
                    <AccordionItem value="video">
                        <AccordionTrigger>Video Settings</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col gap-4">
                                {/* Video Type */}
                                <Field>
                                    <FieldLabel>Video Type</FieldLabel>
                                    <Controller
                                        control={form.control}
                                        name="props.type"
                                        render={({field}) => (
                                            <select
                                                value={field.value}
                                                onChange={(e) => {
                                                    field.onChange(e.target.value);
                                                    setProp(
                                                        (props: EditorVideoProps) =>
                                                            (props.type = e.target.value as VideoType)
                                                    );
                                                }}
                                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
                                            >
                                                <option value="youtube">YouTube</option>
                                                <option value="url">Direct URL</option>
                                            </select>
                                        )}
                                    />
                                </Field>

                                {/* Video URL */}
                                <Field>
                                    <FieldLabel>
                                        {props.type === "youtube" ? "YouTube URL" : "Video URL"}
                                    </FieldLabel>
                                    <Controller
                                        control={form.control}
                                        name="props.src"
                                        render={({field}) => (
                                            <Textarea
                                                value={field.value}
                                                onChange={(e) => {
                                                    field.onChange(e.target.value);
                                                    setProp(
                                                        (props: EditorVideoProps) =>
                                                            (props.src = e.target.value)
                                                    );
                                                }}
                                                placeholder={
                                                    props.type === "youtube"
                                                        ? "https://www.youtube.com/watch?v=..."
                                                        : "https://example.com/video.mp4"
                                                }
                                                rows={3}
                                            />
                                        )}
                                    />
                                </Field>

                                {/* Width */}
                                <Field>
                                    <FieldLabel>Width (px) - Leave empty for 100%</FieldLabel>
                                    <Controller
                                        control={form.control}
                                        name="props.width"
                                        render={({field}) => (
                                            <Input
                                                type="number"
                                                min={0}
                                                value={field.value || ""}
                                                onChange={(e) => {
                                                    const value = e.target.value
                                                        ? parseInt(e.target.value)
                                                        : undefined;
                                                    field.onChange(value);
                                                    setProp(
                                                        (props: EditorVideoProps) =>
                                                            (props.width = value)
                                                    );
                                                }}
                                            />
                                        )}
                                    />
                                </Field>

                                {/* Height */}
                                <Field>
                                    <FieldLabel>Height (px)</FieldLabel>
                                    <Controller
                                        control={form.control}
                                        name="props.height"
                                        render={({field}) => (
                                            <Input
                                                type="number"
                                                min={0}
                                                value={field.value || ""}
                                                onChange={(e) => {
                                                    const value = e.target.value
                                                        ? parseInt(e.target.value)
                                                        : undefined;
                                                    field.onChange(value);
                                                    setProp(
                                                        (props: EditorVideoProps) =>
                                                            (props.height = value)
                                                    );
                                                }}
                                            />
                                        )}
                                    />
                                </Field>

                                {/* Autoplay */}
                                <Field>
                                    <div className="flex items-center justify-between">
                                        <FieldLabel>Autoplay</FieldLabel>
                                        <Controller
                                            control={form.control}
                                            name="props.autoplay"
                                            render={({field}) => (
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={(checked) => {
                                                        field.onChange(checked);
                                                        setProp(
                                                            (props: EditorVideoProps) =>
                                                                (props.autoplay = checked)
                                                        );
                                                    }}
                                                />
                                            )}
                                        />
                                    </div>
                                </Field>

                                {/* Controls */}
                                <Field>
                                    <div className="flex items-center justify-between">
                                        <FieldLabel>Show Controls</FieldLabel>
                                        <Controller
                                            control={form.control}
                                            name="props.controls"
                                            render={({field}) => (
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={(checked) => {
                                                        field.onChange(checked);
                                                        setProp(
                                                            (props: EditorVideoProps) =>
                                                                (props.controls = checked)
                                                        );
                                                    }}
                                                />
                                            )}
                                        />
                                    </div>
                                </Field>

                                {/* Loop */}
                                <Field>
                                    <div className="flex items-center justify-between">
                                        <FieldLabel>Loop</FieldLabel>
                                        <Controller
                                            control={form.control}
                                            name="props.loop"
                                            render={({field}) => (
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={(checked) => {
                                                        field.onChange(checked);
                                                        setProp(
                                                            (props: EditorVideoProps) =>
                                                                (props.loop = checked)
                                                        );
                                                    }}
                                                />
                                            )}
                                        />
                                    </div>
                                </Field>

                                {/* Muted */}
                                <Field>
                                    <div className="flex items-center justify-between">
                                        <FieldLabel>Muted</FieldLabel>
                                        <Controller
                                            control={form.control}
                                            name="props.muted"
                                            render={({field}) => (
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={(checked) => {
                                                        field.onChange(checked);
                                                        setProp(
                                                            (props: EditorVideoProps) =>
                                                                (props.muted = checked)
                                                        );
                                                    }}
                                                />
                                            )}
                                        />
                                    </div>
                                </Field>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                }
            />
        </form>
    );
};

EditorVideo.craft = {
    props: {
        src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        type: "youtube" as VideoType,
        height: 400,
        autoplay: false,
        controls: true,
        loop: false,
        muted: false,
        className: "",
        ...CommonDefaults,
    },
    related: {
        settings: VideoSettings,
    },
};

