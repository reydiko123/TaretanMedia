import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type EmptyStateProps = {
    title: string;
    description?: string;
    action?: ReactNode;
    className?: string;
};

export function EmptyState({
    title,
    description,
    action,
    className,
}: EmptyStateProps) {
    return (
        <div
            className={cn(
                'border-border flex flex-col items-center justify-center rounded-lg border border-dashed px-6 py-12 text-center',
                className,
            )}
        >
            <p className="text-foreground text-base font-medium">{title}</p>
            {description && (
                <p className="text-muted-foreground mt-1 max-w-md text-sm">
                    {description}
                </p>
            )}
            {action && <div className="mt-4">{action}</div>}
        </div>
    );
}
