import { useSyncExternalStore } from 'react';
import { publicAppearance } from '@/lib/public-theme';

export type ResolvedAppearance = 'light' | 'dark';
export type Appearance = ResolvedAppearance | 'system';

export type UseAppearanceReturn = {
    readonly appearance: Appearance;
    readonly resolvedAppearance: ResolvedAppearance;
    readonly updateAppearance: (mode: Appearance) => void;
};

const listeners = new Set<() => void>();
let currentAppearance: Appearance = publicAppearance;

const setCookie = (name: string, value: string, days = 365): void => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const applyTheme = (): void => {
    if (typeof document === 'undefined') {
        return;
    }

    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
};

const subscribe = (callback: () => void) => {
    listeners.add(callback);

    return () => listeners.delete(callback);
};

const notify = (): void => listeners.forEach((listener) => listener());

export function initializeTheme(): void {
    if (typeof window === 'undefined') {
        return;
    }

    localStorage.setItem('appearance', publicAppearance);
    setCookie('appearance', publicAppearance);
    currentAppearance = publicAppearance;
    applyTheme();
}

export function useAppearance(): UseAppearanceReturn {
    const appearance: Appearance = useSyncExternalStore(
        subscribe,
        () => currentAppearance,
        () => publicAppearance,
    );

    const resolvedAppearance: ResolvedAppearance = 'light';

    const updateAppearance = (mode: Appearance): void => {
        void mode;
        currentAppearance = publicAppearance;

        localStorage.setItem('appearance', publicAppearance);

        setCookie('appearance', publicAppearance);

        applyTheme();
        notify();
    };

    return { appearance, resolvedAppearance, updateAppearance } as const;
}
