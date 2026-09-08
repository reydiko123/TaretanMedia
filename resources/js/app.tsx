import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import PublicLayout from '@/layouts/public-layout';

const appName = import.meta.env.VITE_APP_NAME || 'Taretan Media';

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: () => PublicLayout,
    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster />
            </TooltipProvider>
        );
    },
    progress: {
        color: '#b45309',
    },
});

// This will set light / dark mode on load...
initializeTheme();
