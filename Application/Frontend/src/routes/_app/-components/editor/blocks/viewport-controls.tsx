import {Maximize2, Monitor, RotateCcw, Smartphone, Tablet} from 'lucide-react';
import {Button} from '@/components/ui/button';

const VIEWPORT_OPTIONS = [
    {key: 'desktop' as const, icon: Monitor, label: 'Desktop'},
    {key: 'tablet' as const, icon: Tablet, label: 'Tablet'},
    {key: 'mobile' as const, icon: Smartphone, label: 'Mobile'},
];

export type ViewportSize = 'desktop' | 'tablet' | 'mobile';

type ViewportControlsProps = {
    currentSize: ViewportSize;
    isFullscreen: boolean;
    onSizeChange: (size: ViewportSize) => void;
    onFullscreenToggle: () => void;
    onReset: () => void;
};

export const ViewportControls = ({
                                     currentSize,
                                     isFullscreen,
                                     onSizeChange,
                                     onFullscreenToggle,
                                     onReset,
                                 }: ViewportControlsProps) => {
    return (
        <div className="flex items-center gap-1 border rounded-md p-1 bg-background">
            {VIEWPORT_OPTIONS.map(({key, icon: Icon, label}) => (
                <Button
                    key={key}
                    variant={currentSize === key ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => onSizeChange(key)}
                >
                    <Icon className="h-4 w-4"/>
                    <span className="sr-only md:not-sr-only md:ml-2">{label}</span>
                </Button>
            ))}

            <div className="w-px h-6 bg-border mx-1"/>

            <Button
                variant={isFullscreen ? 'default' : 'ghost'}
                size="sm"
                onClick={onFullscreenToggle}
                title="Fullscreen"
            >
                <Maximize2 className="h-4 w-4"/>
            </Button>

            <Button
                variant="ghost"
                size="sm"
                onClick={onReset}
                title="Reset"
            >
                <RotateCcw className="h-4 w-4"/>
            </Button>
        </div>
    );
};

