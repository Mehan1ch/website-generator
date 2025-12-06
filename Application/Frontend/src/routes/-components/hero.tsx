import {Link} from "@tanstack/react-router";
import {Announcement, AnnouncementTag, AnnouncementTitle} from "@/components/ui/announcement.tsx";
import {Button} from "@/components/ui/button.tsx";
import BlurText from "@/components/ui/blur-text.tsx";

const {VITE_APP_NAME} = import.meta.env;
export const Hero = () => (
    <div className="flex flex-col gap-16 px-8 py-24 text-center">
        <div className="flex flex-col items-center justify-center gap-8">
            <Announcement>
                <AnnouncementTag>v1.0.0</AnnouncementTag>
                <AnnouncementTitle>{VITE_APP_NAME}</AnnouncementTitle>
            </Announcement>

            <BlurText
                text="The best way to build your website"
                className="mb-0 justify-center align-middle text-center font-medium text-6xl md:text-7xl xl:text-[5.25rem]"
                delay={150}
                animateBy="words"
                direction="top"
            />
            <p className="mt-0 mb-0 text-balance text-lg text-muted-foreground">
                Build and deploy static websites with an interactive editor.
                Design visually, edit collaboratively, and ship live sites in one click — an end-to-end SaaS solution
                for production-ready static sites.
            </p>
            <div className="flex items-center gap-2">
                <Button asChild>
                    <Link to={"/dashboard"}>Get started</Link>
                </Button>
            </div>
        </div>
    </div>
);