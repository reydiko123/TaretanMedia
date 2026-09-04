import type { ReactNode } from 'react';
import type { BreadcrumbItem } from '@/types/navigation';

export type PublicLayoutProps = {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
};

export type FlashToast = {
    type: 'success' | 'info' | 'warning' | 'error';
    message: string;
};
