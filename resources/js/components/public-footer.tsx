export function PublicFooter() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-border bg-muted/30 border-t">
            <div className="text-muted-foreground mx-auto max-w-6xl px-4 py-8 text-sm sm:px-6">
                <p className="text-foreground font-medium">Taretan Media</p>
                <p className="mt-1">Penerbit buku dan publikasi ilmiah.</p>
                <p className="mt-4">
                    &copy; {year} Taretan Media. Seluruh hak cipta dilindungi.
                </p>
            </div>
        </footer>
    );
}
