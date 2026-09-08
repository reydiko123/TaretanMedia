import { FormEvent, useRef, useState } from 'react';
import { buildWhatsAppUrl, type WhatsAppConfig } from '@/lib/whatsapp';
import { track } from '@/lib/analytics';
import { Button } from '@/components/ui/button';

type Values = {
    name: string;
    email: string;
    title: string;
    publicationType: string;
};
type Errors = Partial<Record<keyof Values, string>>;

export function ManuscriptForm({ config }: { config: WhatsAppConfig }) {
    const [values, setValues] = useState<Values>({
        name: '',
        email: '',
        title: '',
        publicationType: '',
    });
    const [errors, setErrors] = useState<Errors>({});
    const [started, setStarted] = useState(false);
    const summaryRef = useRef<HTMLDivElement>(null);

    function start() {
        if (!started) {
            setStarted(true);
            track('manuscript_form_start');
        }
    }

    function validate(): Errors {
        const next: Errors = {};
        if (!values.name.trim()) next.name = 'Nama wajib diisi.';
        if (!/^\S+@\S+\.\S+$/.test(values.email.trim()))
            next.email = 'Masukkan email yang valid.';
        if (!values.title.trim()) next.title = 'Judul naskah wajib diisi.';
        if (!config.publicationTypes.includes(values.publicationType))
            next.publicationType = 'Pilih jenis publikasi.';
        return next;
    }

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const next = validate();
        setErrors(next);
        if (Object.keys(next).length > 0) {
            requestAnimationFrame(() => summaryRef.current?.focus());
            return;
        }
        const href = buildWhatsAppUrl('manuscript', values, config);
        if (!href) return;
        track('manuscript_whatsapp_click');
        window.open(href, '_blank', 'noopener,noreferrer');
    }

    const field = (key: keyof Values, label: string, type = 'text') => (
        <div className="grid gap-2">
            <label htmlFor={`manuscript-${key}`} className="font-medium">
                {label}
            </label>
            <input
                id={`manuscript-${key}`}
                name={key}
                type={type}
                required
                maxLength={key === 'name' ? 100 : key === 'title' ? 200 : 254}
                value={values[key]}
                onFocus={start}
                onChange={(e) =>
                    setValues({ ...values, [key]: e.target.value })
                }
                aria-invalid={errors[key] ? 'true' : undefined}
                aria-describedby={errors[key] ? `error-${key}` : undefined}
                className="border-input bg-background focus-visible:ring-ring rounded-md border px-3 py-2 focus-visible:ring-2"
            />
            {errors[key] && (
                <p id={`error-${key}`} className="text-destructive text-sm">
                    {errors[key]}
                </p>
            )}
        </div>
    );

    return (
        <form
            onSubmit={submit}
            noValidate
            className="grid gap-5"
            aria-describedby="manuscript-privacy-note"
        >
            <div
                id="manuscript-privacy-note"
                className="bg-muted/40 rounded-lg border p-4 text-sm"
            >
                Informasi ini belum dikirim ke Taretan Media. Setelah WhatsApp
                terbuka, tinjau pesan dan tekan Send sendiri. Pemrosesan
                berikutnya mengikuti kebijakan WhatsApp.
            </div>
            {Object.keys(errors).length > 0 && (
                <div
                    ref={summaryRef}
                    tabIndex={-1}
                    role="alert"
                    className="border-destructive rounded-md border p-4"
                >
                    <p className="font-semibold">Periksa kolom berikut:</p>
                    <ul className="mt-2 list-disc pl-5">
                        {Object.entries(errors).map(([key, message]) => (
                            <li key={key}>
                                <a
                                    className="underline"
                                    href={`#manuscript-${key}`}
                                >
                                    {message}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {field('name', 'Nama lengkap')}
            {field('email', 'Email', 'email')}
            {field('title', 'Judul naskah')}
            <div className="grid gap-2">
                <label
                    htmlFor="manuscript-publicationType"
                    className="font-medium"
                >
                    Jenis publikasi
                </label>
                <select
                    id="manuscript-publicationType"
                    required
                    value={values.publicationType}
                    onFocus={start}
                    onChange={(e) =>
                        setValues({
                            ...values,
                            publicationType: e.target.value,
                        })
                    }
                    aria-invalid={errors.publicationType ? 'true' : undefined}
                    aria-describedby={
                        errors.publicationType
                            ? 'error-publicationType'
                            : undefined
                    }
                    className="border-input bg-background rounded-md border px-3 py-2"
                >
                    <option value="">Pilih jenis publikasi</option>
                    {config.publicationTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
                {errors.publicationType && (
                    <p
                        id="error-publicationType"
                        className="text-destructive text-sm"
                    >
                        {errors.publicationType}
                    </p>
                )}
            </div>
            <Button type="submit" size="lg">
                Buka WhatsApp
            </Button>
        </form>
    );
}
