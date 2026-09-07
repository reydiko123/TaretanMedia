export function PublicFooter() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-border bg-muted/30">
            <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground sm:px-6">
                <p className="font-medium text-foreground">Taretan Media</p>
                <p className="mt-1">Penerbit buku dan publikasi ilmiah.</p>
                <p className="mt-4">
                    &copy; {year} Taretan Media. Seluruh hak cipta dilindungi.
                </p>
            </div>
        </footer>
    );
}
