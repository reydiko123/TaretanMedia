# AI Agent Guardrails — Taretan Media

Gunakan instruksi ini bersama PRD dan implementation plan ketika meminta AI Agent mengimplementasikan kode.

```text
PRD dan implementation plan phase aktif adalah sumber kebenaran.

Do not implement anything listed under Won't Have or Out of Scope in the PRD.
Any additional feature must be documented as a proposal and must not be implemented without explicit approval.

GENERAL DELIVERY RULES

1. Kerjakan hanya phase dan task yang secara eksplisit diberikan.
2. Jangan melanjutkan otomatis ke phase berikutnya.
3. Jangan mengubah scope secara diam-diam.
4. Jangan mengarang file, dependency, konfigurasi, hasil test, akses hosting, atau kondisi production.
5. Periksa repository sebelum mengambil keputusan implementasi.
6. Gunakan versi dependency dari lockfile dan manifest repository, bukan asumsi.
7. Bila menemukan konflik requirement, berhenti pada task terkait, dokumentasikan konflik, dampak, opsi, dan rekomendasi.
8. Jangan menyederhanakan requirement hanya agar implementasi lebih mudah.
9. Setiap perubahan harus mempunyai test atau prosedur verifikasi yang sesuai.
10. Jangan menyatakan task selesai sebelum acceptance criteria terbukti.

MVP NON-GOALS

Jangan membuat:

- registrasi, login, profil, wishlist, atau histori pengunjung;
- cart, checkout, payment, ongkir, invoice, inventory, atau order management;
- lead database atau CRM internal;
- penyimpanan form kirim naskah;
- upload file naskah pengguna;
- WhatsApp Business API, chatbot, atau pengiriman otomatis;
- PDF jurnal internal, PDF viewer, DOI, peer review, submission workflow, volume/issue, atau artikel ilmiah individual;
- harga atau kalkulator harga layanan;
- komentar, rating, newsletter, forum, atau push notification;
- REST API publik, GraphQL API publik, atau aplikasi mobile native;
- multi-role editorial workflow;
- multi-tenant publisher;
- multibahasa atau multi-currency;
- integrasi marketplace;
- SITE_SETTINGS atau pengelolaan konfigurasi global melalui dashboard admin.

ARCHITECTURE RULES

- Halaman publik menggunakan Laravel web routes, Inertia.js, dan React.js.
- Tidak ada REST API publik pada MVP.
- Server menjadi source of truth untuk published state, authorization, filter normalization, pagination, sanitasi, dan canonical URL.
- Filament digunakan untuk panel admin privat.
- Form Kirim Naskah bersifat client-only dan tidak mempunyai endpoint POST.
- Form Kirim Naskah tidak boleh menyimpan atau mengirim data personal ke server Taretan Media.
- File media disimpan melalui Laravel Storage, bukan BLOB database.
- Profil, visi, misi, nilai, alamat, dan teks global berasal dari source/config.
- Credential, nomor WhatsApp, email, social URL, dan nilai per-environment berasal dari environment.

DATA AND SECURITY RULES

- Draft dan soft-deleted content tidak boleh tersedia pada route publik.
- Rich text harus disanitasi menggunakan allowlist.
- External journal URL wajib valid dan HTTPS.
- External links memakai rel yang aman.
- Upload hanya JPEG, PNG, dan WebP maksimum 5 MB.
- SVG dan executable ditolak.
- Nama file upload dibuat ulang oleh sistem.
- Credential tidak boleh di-hardcode atau dicetak ke log.
- Analytics dan log tidak boleh berisi nama, email, isi form, credential, session token, atau query sensitif.
- Production menggunakan APP_DEBUG=false.

PRODUCTION RULES

- Jangan mengklaim production-ready tanpa evidence.
- Shared-hosting preflight adalah hard gate.
- SQLite hanya boleh dipakai di production setelah pdo_sqlite, persistent writable filesystem, private database location, locking, concurrency, backup, restore, dan deployment process lulus.
- Jika syarat inti SQLite gagal, gunakan MySQL atau PostgreSQL yang disediakan hosting.
- Demo data tidak boleh masuk production tanpa persetujuan.
- Buat backup sebelum migration berisiko.
- Sediakan rollback trigger dan rollback procedure.

REPORTING FORMAT

Pada akhir pengerjaan, laporkan:

1. task yang selesai;
2. file yang berubah;
3. migration atau konfigurasi yang berubah;
4. test dan command yang dijalankan;
5. hasil aktual;
6. acceptance criteria yang terbukti;
7. item yang gagal atau belum dapat diverifikasi;
8. risiko atau technical debt baru;
9. status phase: COMPLETE, PARTIAL, atau BLOCKED.

Jangan menggunakan COMPLETE bila ada acceptance criteria wajib yang belum terbukti.
```
