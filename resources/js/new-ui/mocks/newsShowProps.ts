import type { NewsShowProps, ImageAsset } from "@/new-ui/types/public"

const site = {
  name: "CV Taretan Media Publishing",
  tagline: "Penerbit Buku & Publikasi Ilmiah",
  shortDescription: "Penerbitan buku dan publikasi ilmiah yang bertumbuh bersama penulis.",
}

const contact = { email: "halo@taretan.media" }

const featuredImage: ImageAsset = {
  src: "/book-covers/merawat-ingatan-madura.svg",
  alt: "Ilustrasi naskah yang sedang disunting",
  width: 1200,
  height: 675,
}

const completeNews = {
  id: 101,
  title: "Menata Gagasan Menjadi Naskah Buku",
  slug: "menata-gagasan-menjadi-naskah-buku",
  excerpt: "Cara sederhana memetakan gagasan agar naskah buku terasa utuh sejak halaman pertama.",
  featuredImage,
  authorName: "Ayu Rahma",
  author: { id: 11, name: "Ayu Rahma", about: "Editor dan penulis." },
  categories: ["Penerbitan", "Edukasi"],
  publishedAt: "2026-03-14T00:00:00.000Z",
  bodyHtml: `
    <p>Gagasan yang kuat membutuhkan ruang untuk tumbuh menjadi naskah yang utuh.</p>
    <h2>Mulai dari pertanyaan pembaca</h2>
    <p>Tuliskan satu pertanyaan yang ingin dijawab oleh buku Anda.</p>
    <h3>Petakan bagian penting</h3>
    <ul><li>Tentukan tujuan tulisan.</li><li>Susun alur pembahasan.</li></ul>
    <blockquote>Menulis adalah proses merawat gagasan agar dapat dibagikan.</blockquote>
    <p>Pelajari juga <a href="/layanan">layanan editorial kami</a> atau <a href="https://example.org/referensi">referensi penulisan</a>.</p>
    <table><thead><tr><th>Tahap</th><th>Fokus</th></tr></thead><tbody><tr><td>Awal</td><td>Gagasan</td></tr></tbody></table>
    <pre><code>outline = ideas.map(idea =&gt; idea.trim())</code></pre>
  `,
} satisfies NewsShowProps["news"]

const relatedNews = [
  { title: "Mengapa Editing Penting dalam Proses Penerbitan", slug: "mengapa-editing-penting", excerpt: "Editing menjaga kejernihan pesan.", featuredImage: null, authorName: "Budi Santoso", categories: ["Penerbitan"], publishedAt: "2026-02-28" },
  { title: "Membaca Lebih Kritis di Tengah Banjir Informasi", slug: "membaca-lebih-kritis", excerpt: "Kebiasaan membaca yang lebih jernih.", featuredImage: null, authorName: "Nadia Fitria", categories: ["Literasi"], publishedAt: "2026-02-09" },
  { title: "Panduan Ringkas Menyusun Referensi Akademik", slug: "panduan-menyusun-referensi-akademik", excerpt: "Rujukan yang rapi memperkuat tulisan.", featuredImage: null, authorName: "Rizal Maulana", categories: ["Edukasi"], publishedAt: "2026-01-21" },
]

const catalogNewsShowProps: NewsShowProps[] = [
  {
    site,
    contact,
    news: {
      id: 110,
      title: "Membangun Kebiasaan Membaca yang Menumbuhkan Gagasan",
      slug: "membangun-kebiasaan-membaca-menumbuhkan-gagasan",
      excerpt: "Membaca bukan sekadar menambah jumlah buku yang selesai, melainkan membangun cara berpikir yang lebih sabar, kritis, dan kaya gagasan.",
      featuredImage: { ...featuredImage, alt: "Ilustrasi kebiasaan membaca dan mencatat gagasan" },
      authorName: "Taretan Editorial",
      author: { id: 20, name: "Taretan Editorial", about: "Tim editorial CV Taretan Media Publishing." },
      categories: ["Literasi", "Edukasi"],
      publishedAt: "2026-04-05T00:00:00.000Z",
      bodyHtml: `
        <p>Membaca sering kali dipahami sebagai kegiatan menyelesaikan halaman demi halaman. Padahal, inti dari membaca bukanlah seberapa cepat sebuah buku selesai, melainkan seberapa jauh gagasan di dalamnya membantu kita melihat dunia dengan lebih jernih. Kebiasaan membaca yang baik memberi ruang bagi seseorang untuk berhenti sejenak, mengajukan pertanyaan, dan menghubungkan pengetahuan baru dengan pengalaman yang sudah dimiliki.</p>
        <p>Di tengah arus informasi yang terus bergerak, membaca membutuhkan kesengajaan. Kita tidak selalu memerlukan waktu berjam-jam atau rak buku yang penuh untuk memulainya. Yang lebih penting adalah membangun ritme yang dapat dipertahankan, memilih bacaan dengan perhatian, dan memberi kesempatan kepada gagasan untuk tinggal lebih lama di dalam pikiran.</p>

        <h2>Membaca sebagai cara memperlambat pikiran</h2>
        <p>Layar dan notifikasi mendorong kita berpindah dari satu informasi ke informasi lain dengan sangat cepat. Perpindahan itu berguna ketika kita sedang mencari kabar singkat, tetapi tidak selalu membantu ketika kita ingin memahami persoalan yang memiliki banyak lapisan. Membaca tulisan yang lebih panjang melatih kita untuk mengikuti alur, mengingat konteks, dan menunda kesimpulan sampai seluruh bagian penting dipahami.</p>
        <p>Perlambatan ini bukan berarti kita harus membaca dengan cara yang kaku. Kita tetap dapat memilih bagian yang paling relevan, membuat tanda pada halaman penting, atau berhenti ketika konsentrasi mulai berkurang. Perlahan-lahan, kita belajar mengenali perbedaan antara membaca untuk memperoleh informasi dan membaca untuk membentuk pemahaman.</p>

        <h2>Mulai dengan tujuan yang sederhana</h2>
        <p>Banyak rencana membaca berhenti karena targetnya terlalu besar sejak awal. Keinginan membaca lima buku dalam sebulan mungkin terdengar menarik, tetapi target tersebut tidak selalu sesuai dengan ritme kerja, keluarga, dan tanggung jawab lain. Kebiasaan akan lebih mudah tumbuh ketika dimulai dari tujuan kecil yang jelas.</p>
        <h3>Pilih pertanyaan sebelum memilih bacaan</h3>
        <p>Sebelum membuka buku, tuliskan satu pertanyaan yang ingin Anda pahami. Pertanyaan itu tidak harus rumit. Misalnya, Anda dapat bertanya tentang bagaimana sebuah kota berubah, mengapa suatu kebiasaan bertahan, atau bagaimana seorang penulis menjelaskan pengalaman tertentu. Pertanyaan sederhana membuat proses membaca terasa lebih terarah tanpa membatasi kemungkinan menemukan hal baru.</p>
        <ol>
          <li>Tentukan waktu membaca yang paling realistis dalam rutinitas harian.</li>
          <li>Pilih bacaan yang sesuai dengan pertanyaan atau minat yang sedang tumbuh.</li>
          <li>Mulai dari durasi pendek, kemudian tambah waktunya jika konsentrasi tetap terjaga.</li>
          <li>Catat satu gagasan yang ingin Anda ingat setelah selesai membaca.</li>
        </ol>

        <h2>Membangun ruang baca yang membantu</h2>
        <p>Ruang baca tidak harus berupa sudut khusus dengan perabot yang mahal. Sebuah kursi yang nyaman, pencahayaan yang cukup, dan ponsel yang disimpan sedikit lebih jauh sudah dapat mengurangi gangguan. Jika membaca melalui perangkat digital, atur notifikasi agar tidak muncul selama waktu membaca. Perubahan kecil pada lingkungan sering kali lebih efektif daripada mengandalkan kemauan semata.</p>
        <p>Yang juga penting adalah menyiapkan bahan bacaan sebelum waktu membaca dimulai. Ketika kita masih harus memilih buku, mencari berkas, atau menentukan berita di tengah sesi, perhatian mudah terpecah. Simpan daftar bacaan di satu tempat dan pilih satu judul untuk dibaca terlebih dahulu. Dengan begitu, keputusan kecil tidak menghabiskan energi yang seharusnya digunakan untuk memahami isi.</p>

        <blockquote>Membaca dengan tekun bukan perlombaan untuk menuntaskan halaman, melainkan latihan untuk memberi perhatian pada gagasan.</blockquote>

        <h2>Mencatat tanpa mengubah membaca menjadi beban</h2>
        <p>Catatan membantu kita mengingat, tetapi mencatat terlalu banyak dapat membuat proses membaca terasa seperti pekerjaan administratif. Cobalah menggunakan catatan yang singkat dan mudah ditinjau kembali. Tiga jenis catatan berikut dapat menjadi titik awal:</p>
        <ul>
          <li><strong>Gagasan utama:</strong> satu atau dua kalimat yang merangkum inti bagian yang dibaca.</li>
          <li><strong>Pertanyaan:</strong> hal yang belum jelas atau ingin ditelusuri lebih lanjut.</li>
          <li><strong>Hubungan:</strong> pengalaman, buku, atau persoalan lain yang terasa berkaitan.</li>
        </ul>
        <p>Catatan tidak harus ditulis dengan bahasa yang sempurna. Gunakan kata-kata sendiri agar catatan tersebut benar-benar menjadi alat berpikir, bukan salinan dari buku. Pada kesempatan berikutnya, buka kembali catatan itu dan tambahkan satu kalimat tentang perubahan pemahaman Anda. Proses meninjau ulang inilah yang membuat bacaan meninggalkan jejak lebih kuat.</p>

        <h2>Membaca berbagai jenis tulisan</h2>
        <p>Keragaman bacaan memperkaya cara kita memahami suatu persoalan. Buku nonfiksi dapat memberi kerangka pengetahuan, esai membantu kita mengikuti argumen, karya sastra mengasah kepekaan terhadap pengalaman manusia, sedangkan tulisan jurnalistik mempertemukan kita dengan peristiwa dan suara yang beragam. Tidak semua bacaan harus langsung terasa berguna. Sebagian bacaan mungkin hanya membuka pertanyaan yang baru bisa dijawab beberapa waktu kemudian.</p>
        <p>Untuk menjaga keseimbangan, susun daftar bacaan dengan beberapa tujuan berbeda. Satu bacaan dapat dipilih karena berkaitan dengan pekerjaan, satu karena ingin memahami isu tertentu, dan satu lagi karena menawarkan pengalaman estetis. Perpindahan di antara jenis tulisan membuat kebiasaan membaca tetap hidup dan tidak terasa seperti tugas yang berulang.</p>
        <table>
          <thead><tr><th>Jenis bacaan</th><th>Latihan yang ditawarkan</th></tr></thead>
          <tbody>
            <tr><td>Esai</td><td>Mengikuti argumen dan menilai hubungan antar gagasan.</td></tr>
            <tr><td>Karya sastra</td><td>Memahami pengalaman, emosi, dan sudut pandang yang berbeda.</td></tr>
            <tr><td>Jurnalisme</td><td>Memeriksa konteks, sumber, dan dampak sebuah peristiwa.</td></tr>
            <tr><td>Buku referensi</td><td>Membangun pengetahuan yang dapat ditelusuri kembali.</td></tr>
          </tbody>
        </table>

        <h2>Mengubah bacaan menjadi gagasan</h2>
        <p>Gagasan sering muncul ketika dua hal yang sebelumnya terasa terpisah mulai terhubung. Setelah membaca, tanyakan apa hubungan bacaan tersebut dengan pekerjaan, lingkungan, atau percakapan yang sedang berlangsung. Anda dapat menuliskan satu paragraf tanggapan, menceritakannya kepada teman, atau menggunakannya sebagai bahan untuk menyusun tulisan pendek.</p>
        <p>Jangan menunggu sampai memiliki pemikiran yang sempurna. Gagasan biasanya berkembang melalui beberapa versi: catatan awal, percakapan, draf, lalu revisi. Setiap tahap membantu kita menemukan bagian yang masih kabur dan memperjelas alasan mengapa gagasan itu penting. Dalam proses ini, membaca memberi bahan, sedangkan menulis membantu kita menguji dan merawatnya.</p>
        <h3>Gunakan percakapan sebagai ruang uji</h3>
        <p>Ceritakan kembali isi bacaan dengan bahasa yang sederhana. Jika Anda kesulitan menjelaskan sebuah gagasan tanpa mengulang kalimat dari sumbernya, mungkin pemahaman Anda masih perlu diperdalam. Sebaliknya, jika Anda mampu menjelaskannya dan menerima pertanyaan dari orang lain, Anda akan menemukan sudut pandang baru yang tidak selalu terlihat ketika membaca sendirian.</p>

        <h2>Menjaga kebiasaan tetap realistis</h2>
        <p>Ada masa ketika jadwal berubah, konsentrasi menurun, atau bacaan yang dipilih ternyata tidak sesuai kebutuhan. Hal itu bukan tanda bahwa kebiasaan membaca gagal. Beri izin kepada diri sendiri untuk mengganti judul, mengurangi durasi, atau beristirahat beberapa hari. Kebiasaan yang sehat memiliki ruang untuk menyesuaikan diri tanpa kehilangan arah.</p>
        <p>Ukurlah keberhasilan dari hubungan yang terbentuk dengan bacaan, bukan hanya dari jumlah buku yang selesai. Apakah Anda lebih mampu mengajukan pertanyaan? Apakah Anda lebih teliti membedakan pendapat dan fakta? Apakah Anda menemukan bahasa baru untuk menjelaskan pengalaman sendiri? Pertanyaan-pertanyaan itu membantu melihat manfaat membaca secara lebih utuh.</p>

        <h2>Penutup: memberi waktu kepada gagasan untuk tumbuh</h2>
        <p>Membangun kebiasaan membaca adalah proses jangka panjang. Ia dimulai dari keputusan sederhana untuk memberi perhatian kepada satu tulisan, lalu berlanjut melalui catatan, percakapan, dan tulisan yang kita hasilkan sendiri. Tidak semua bacaan akan mengubah cara pandang secara langsung, tetapi setiap bacaan dapat menjadi bagian dari cara kita menyusun pemahaman.</p>
        <p>Mulailah dengan waktu yang sanggup Anda jaga. Pilih bacaan yang membuat Anda ingin kembali, catat hal yang penting, dan biarkan pertanyaan berkembang tanpa harus segera diselesaikan. Ketika dilakukan dengan tekun, membaca bukan hanya mengisi waktu luang, tetapi juga membuka ruang bagi gagasan untuk tumbuh dan menemukan bentuknya.</p>
      `,
    },
    canonicalUrl: "https://taretan.media/berita/membangun-kebiasaan-membaca-menumbuhkan-gagasan",
    relatedNews: relatedNews.slice(0, 3),
  },
  {
    site,
    contact,
    news: {
      id: 103,
      title: "Mengapa Editing Penting dalam Proses Penerbitan",
      slug: "mengapa-editing-penting",
      excerpt: "Editing membantu menjaga ketepatan pesan, alur, dan pengalaman pembaca dalam sebuah karya.",
      featuredImage: null,
      authorName: "Budi Santoso",
      author: { id: 13, name: "Budi Santoso", about: "Editor penerbitan." },
      categories: ["Penerbitan"],
      publishedAt: "2026-02-28T00:00:00.000Z",
      bodyHtml: `<p>Editing membantu sebuah naskah menyampaikan gagasan dengan lebih jernih dan terarah.</p><h2>Editing menjaga pesan utama</h2><p>Editor membaca naskah dari sudut pandang penulis sekaligus pembaca agar alur dan pilihan kata tetap konsisten.</p><h2>Proses yang bertahap</h2><p>Revisi isi, penyuntingan bahasa, dan pemeriksaan akhir saling melengkapi dalam proses penerbitan.</p>`,
    },
    canonicalUrl: "https://taretan.media/berita/mengapa-editing-penting",
    relatedNews: relatedNews.filter((item) => item.slug !== "mengapa-editing-penting"),
  },
  {
    site,
    contact,
    news: {
      id: 104,
      title: "Membaca Lebih Kritis di Tengah Banjir Informasi",
      slug: "membaca-lebih-kritis",
      excerpt: "Beberapa kebiasaan membaca yang dapat membantu kita memahami informasi dengan lebih jernih.",
      featuredImage: { ...featuredImage, alt: "Ilustrasi membaca kritis" },
      authorName: "Nadia Fitria",
      author: { id: 14, name: "Nadia Fitria", about: "Penulis dan pegiat literasi." },
      categories: ["Literasi", "Edukasi"],
      publishedAt: "2026-02-09T00:00:00.000Z",
      bodyHtml: `<p>Arus informasi yang cepat membuat kemampuan membaca kritis semakin penting dalam keseharian.</p><h2>Berhenti sejenak sebelum percaya</h2><p>Periksa sumber, konteks, dan tujuan sebuah informasi sebelum menyebarkannya kepada orang lain.</p><h3>Catat pertanyaan yang muncul</h3><ul><li>Apa sumber informasi ini?</li><li>Bukti apa yang mendukungnya?</li><li>Sudut pandang apa yang belum terlihat?</li></ul>`,
    },
    canonicalUrl: "https://taretan.media/berita/membaca-lebih-kritis",
    relatedNews: relatedNews.filter((item) => item.slug !== "membaca-lebih-kritis"),
  },
  {
    site,
    contact,
    news: {
      id: 105,
      title: "Panduan Ringkas Menyusun Referensi Akademik",
      slug: "panduan-menyusun-referensi-akademik",
      excerpt: "Kenali langkah penting untuk merapikan referensi agar tulisan akademik lebih dapat dipercaya.",
      featuredImage: { ...featuredImage, alt: "Ilustrasi referensi akademik" },
      authorName: "Rizal Maulana",
      author: { id: 15, name: "Rizal Maulana", about: "Penulis dan peneliti." },
      categories: ["Edukasi"],
      publishedAt: "2026-01-21T00:00:00.000Z",
      bodyHtml: `<p>Referensi yang tersusun rapi memudahkan pembaca menelusuri dasar pemikiran sebuah tulisan akademik.</p><h2>Mulai dari catatan sumber</h2><p>Simpan informasi penulis, judul, tahun, dan penerbit sejak pertama kali membaca sumber.</p><h2>Periksa konsistensi</h2><p>Gunakan satu gaya sitasi secara konsisten dari awal hingga akhir naskah.</p>`,
    },
    canonicalUrl: "https://taretan.media/berita/panduan-menyusun-referensi-akademik",
    relatedNews: relatedNews.filter((item) => item.slug !== "panduan-menyusun-referensi-akademik"),
  },
  {
    site,
    contact,
    news: {
      id: 106,
      title: "Bahasa yang Jernih untuk Tulisan yang Berdaya",
      slug: "bahasa-jernih-tulisan-berdaya",
      excerpt: null,
      featuredImage: null,
      authorName: "",
      author: { id: 16, name: "", about: null },
      categories: ["Literasi"],
      publishedAt: "2025-12-10T00:00:00.000Z",
      bodyHtml: `<p>Bahasa yang jernih membantu pembaca memahami gagasan tanpa harus melewati kerumitan yang tidak perlu.</p><h2>Pilih kata yang tepat</h2><p>Gunakan kata yang sesuai dengan tujuan, konteks, dan pembaca tulisan Anda.</p>`,
    },
    canonicalUrl: "https://taretan.media/berita/bahasa-jernih-tulisan-berdaya",
    relatedNews: relatedNews.slice(0, 2),
  },
  {
    site,
    contact,
    news: {
      id: 107,
      title: "Dari Catatan Lapangan Menjadi Buku yang Bermakna",
      slug: "catatan-lapangan-menjadi-buku",
      excerpt: "Catatan lapangan dapat berkembang menjadi buku yang bermakna ketika dirawat melalui proses yang terarah.",
      featuredImage: { ...featuredImage, alt: "Ilustrasi catatan lapangan" },
      authorName: "Siti Aminah",
      author: { id: 17, name: "Siti Aminah", about: "Penulis dokumenter." },
      categories: ["Penerbitan", "Literasi"],
      publishedAt: "2025-11-06T00:00:00.000Z",
      bodyHtml: `<p>Catatan lapangan menyimpan detail, suara, dan pengalaman yang dapat dirawat menjadi cerita yang utuh.</p><h2>Pilah catatan berdasarkan tema</h2><p>Kelompokkan temuan lapangan agar pola dan benang merah cerita mulai terlihat.</p><blockquote>Catatan yang dirawat dengan tekun dapat menjadi ingatan yang dibagikan.</blockquote>`,
    },
    canonicalUrl: "https://taretan.media/berita/catatan-lapangan-menjadi-buku",
    relatedNews: relatedNews.slice(0, 2),
  },
  {
    site,
    contact,
    news: {
      id: 108,
      title: "Mengenal Alur Publikasi Ilmiah untuk Penulis Pemula",
      slug: "alur-publikasi-ilmiah-penulis-pemula",
      excerpt: "Memahami alur publikasi membantu penulis menyiapkan naskah dan berkomunikasi dengan lebih baik.",
      featuredImage: null,
      authorName: "Taretan Editorial",
      author: { id: 18, name: "Taretan Editorial", about: "Tim editorial CV Taretan Media Publishing." },
      categories: ["Edukasi", "Penerbitan"],
      publishedAt: "2025-10-18T00:00:00.000Z",
      bodyHtml: `<p>Publikasi ilmiah membutuhkan naskah yang terarah, referensi yang kuat, dan komunikasi yang terbuka.</p><h2>Siapkan naskah</h2><p>Pastikan struktur, data, dan tujuan tulisan sudah jelas sebelum mengirimkan naskah.</p><h2>Pahami proses review</h2><p>Masukan editor dan reviewer menjadi bagian penting untuk memperkuat kualitas publikasi.</p>`,
    },
    canonicalUrl: "https://taretan.media/berita/alur-publikasi-ilmiah-penulis-pemula",
    relatedNews: relatedNews.slice(0, 2),
  },
  {
    site,
    contact,
    news: {
      id: 109,
      title: "Merawat Ingatan Lokal Melalui Tulisan",
      slug: "merawat-ingatan-lokal",
      excerpt: "Tulisan adalah salah satu cara untuk menjaga cerita lokal agar terus dipelajari lintas generasi.",
      featuredImage: { ...featuredImage, alt: "Ilustrasi ingatan lokal" },
      authorName: "Fauzan Hakim",
      author: { id: 19, name: "Fauzan Hakim", about: "Penulis dan peneliti budaya." },
      categories: ["Literasi"],
      publishedAt: "2025-09-02T00:00:00.000Z",
      bodyHtml: `<p>Ingatan lokal hidup melalui cerita, arsip, dan kesediaan untuk menuliskannya kembali dengan penuh perhatian.</p><h2>Mendengar sebelum menulis</h2><p>Hormati pengalaman narasumber dan pertahankan konteks ketika mengolah cerita lokal.</p><h2>Menulis untuk generasi berikutnya</h2><p>Tulisan yang terawat dapat menjadi jembatan antara pengalaman masa lalu dan pembaca masa kini.</p>`,
    },
    canonicalUrl: "https://taretan.media/berita/merawat-ingatan-lokal",
    relatedNews: relatedNews.slice(0, 2),
  },
]

export const completeNewsShowProps: NewsShowProps = {
  site,
  contact,
  news: completeNews,
  canonicalUrl: "https://taretan.media/berita/menata-gagasan-menjadi-naskah-buku",
  relatedNews,
}

export const minimalNewsShowProps: NewsShowProps = {
  site,
  contact: {},
  news: {
    id: 102,
    title: "Catatan Singkat untuk Penulis",
    slug: "catatan-singkat-untuk-penulis",
    excerpt: null,
    featuredImage: null,
    authorName: "",
    author: { id: 12, name: "", about: null },
    categories: [],
    publishedAt: "invalid-date",
    bodyHtml: "<p>Satu catatan singkat untuk memulai proses menulis.</p>",
  },
  canonicalUrl: "https://taretan.media/berita/catatan-singkat-untuk-penulis",
}

export const emptyBodyNewsShowProps: NewsShowProps = {
  ...minimalNewsShowProps,
  news: { ...minimalNewsShowProps.news, bodyHtml: "  \n  " },
}

export const brokenImageNewsShowProps: NewsShowProps = {
  ...completeNewsShowProps,
  news: {
    ...completeNewsShowProps.news,
    featuredImage: { ...featuredImage, src: "/missing-article-cover.webp", alt: "" },
  },
  relatedNews: [],
}

export const invalidShareUrlNewsShowProps: NewsShowProps = {
  ...minimalNewsShowProps,
  canonicalUrl: "/berita/catatan-singkat-untuk-penulis",
}

const localNewsShowFixtures = [
  completeNewsShowProps,
  ...catalogNewsShowProps,
  minimalNewsShowProps,
  emptyBodyNewsShowProps,
  brokenImageNewsShowProps,
  invalidShareUrlNewsShowProps,
]

export function getLocalNewsShowProps(slug: string): NewsShowProps | null {
  return localNewsShowFixtures.find((fixture) => fixture.news.slug === slug) ?? null
}
