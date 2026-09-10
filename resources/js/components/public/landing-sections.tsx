import { ArrowRight, UsersRound } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import {
    publicMutedSectionClass,
    publicSectionClass,
    publicServiceAnimationClass,
    publicSurfaceClass,
    publicTeamImageClass,
    publicTeamImageFrameClass,
} from '@/lib/public-theme';
import {
    publishingServices,
    publishingSteps,
    teamMembers,
} from '@/lib/public-content';

export function PublishingServiceGrid({
    compact = false,
    interactive = true,
}: {
    compact?: boolean;
    interactive?: boolean;
}) {
    return (
        <div
            className={cn(
                '-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:px-0',
                compact
                    ? 'sm:grid-cols-2 lg:grid-cols-3'
                    : 'sm:grid-cols-2 lg:grid-cols-5',
            )}
        >
            {publishingServices.map(
                ({ title, description, href, icon: Icon }) => {
                    const className = cn(
                        publicSurfaceClass,
                        publicServiceAnimationClass,
                        'flex h-full w-[78vw] max-w-[19rem] shrink-0 snap-start flex-col p-5 transition-all duration-300 sm:w-auto sm:max-w-none sm:p-6',
                        compact && 'lg:flex-row lg:gap-5',
                    );
                    const content = (
                        <>
                            <span className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-xl">
                                <Icon className="size-5" aria-hidden="true" />
                            </span>
                            <div className={cn(compact && 'lg:flex-1')}>
                                <h3 className="public-display mt-4 text-xl font-bold lg:mt-5">
                                    {title}
                                </h3>
                                <p className="text-muted-foreground mt-2 text-sm leading-7">
                                    {description}
                                </p>
                                {interactive && (
                                    <span className="text-primary mt-4 inline-flex items-center gap-1.5 text-sm font-bold">
                                        Pelajari{' '}
                                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                )}
                            </div>
                        </>
                    );

                    return interactive ? (
                        <Link
                            key={href}
                            href={href}
                            id={href.split('#')[1]}
                            className={className}
                        >
                            {content}
                        </Link>
                    ) : (
                        <div
                            key={href}
                            id={href.split('#')[1]}
                            className={className}
                        >
                            {content}
                        </div>
                    );
                },
            )}
        </div>
    );
}

export function PublishingSteps() {
    return (
        <section className="border-border bg-background border-y">
            <div
                className={cn(
                    'mx-auto max-w-7xl px-4 sm:px-6',
                    publicSectionClass,
                )}
            >
                <div className="max-w-2xl">
                    <p className="public-section-label">Prosedur</p>
                    <h2 className="public-display mt-3 text-3xl leading-tight font-bold sm:text-5xl">
                        Langkah Penerbitan
                    </h2>
                    <p className="text-muted-foreground mt-4 leading-7">
                        Alur penerbitan yang jelas dan transparan dari naskah
                        hingga karya siap dibaca.
                    </p>
                </div>
                <div className="relative mt-10 grid gap-8 md:grid-cols-3 lg:grid-cols-5 lg:gap-5">
                    <div className="bg-border absolute top-0 left-5 h-full w-px md:top-6 md:left-0 md:h-px md:w-full" />
                    {publishingSteps.map((step) => (
                        <div
                            key={step.no}
                            className="relative flex gap-4 md:block"
                        >
                            <span className="bg-background text-primary border-primary z-10 flex size-11 shrink-0 items-center justify-center rounded-full border-2 font-mono text-xs font-bold shadow-sm">
                                {step.no}
                            </span>
                            <div className="md:mt-4">
                                <h3 className="text-sm font-bold">
                                    {step.title}
                                </h3>
                                <p className="text-muted-foreground mt-1 text-xs leading-6">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function ProfessionalTeam() {
    return (
        <section className={`${publicMutedSectionClass} ${publicSectionClass}`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="public-section-label">
                        Di balik setiap karya
                    </p>
                    <h2 className="public-display mt-3 text-3xl leading-tight font-bold sm:text-5xl">
                        Tim Profesional Kami
                    </h2>
                    <p className="text-muted-foreground mt-4 leading-7">
                        Dua peran yang bekerja bersama untuk menjaga proses
                        penerbitan tetap rapi, komunikatif, dan siap membawa
                        karya Anda lebih jauh.
                    </p>
                </div>
                <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2">
                    {teamMembers.map((member) => (
                        <article
                            key={member.name}
                            className={cn(
                                publicSurfaceClass,
                                'overflow-hidden',
                            )}
                        >
                            <div className={publicTeamImageFrameClass}>
                                <img
                                    src={member.image}
                                    alt={`Foto ${member.name}`}
                                    className={publicTeamImageClass}
                                    loading="lazy"
                                />
                            </div>
                            <div className="p-5 sm:p-6">
                                <div className="text-primary flex items-center gap-2 text-xs font-bold tracking-[0.16em] uppercase">
                                    <UsersRound
                                        className="size-4"
                                        aria-hidden="true"
                                    />{' '}
                                    Tim Taretan Media
                                </div>
                                <h3 className="public-display mt-3 text-2xl font-bold">
                                    {member.name}
                                </h3>
                                <p className="text-muted-foreground mt-1 text-sm">
                                    {member.role}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
