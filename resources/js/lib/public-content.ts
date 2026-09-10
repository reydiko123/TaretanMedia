import {
    BookOpen,
    MessagesSquare,
    Newspaper,
    Palette,
    PenLine,
    type LucideIcon,
} from 'lucide-react';

export type PublishingService = {
    title: string;
    description: string;
    href: string;
    icon: LucideIcon;
};

export const publishingServices: PublishingService[] = [
    {
        title: 'Penerbitan Buku',
        description:
            'Layanan penerbitan buku menyeluruh: ISBN, editing, layout, desain cover, e-book, hingga cetak.',
        href: '/layanan#penerbitan-buku',
        icon: BookOpen,
    },
    {
        title: 'Publikasi Jurnal',
        description:
            'Pengelolaan dan publikasi artikel ilmiah untuk mendukung penyebarluasan penelitian dan ilmu pengetahuan.',
        href: '/layanan#publikasi-jurnal',
        icon: Newspaper,
    },
    {
        title: 'Editing & Proofreading',
        description:
            'Penyuntingan bahasa dan proofreading untuk memastikan naskah lebih rapi, jelas, dan siap diterbitkan.',
        href: '/layanan#editing-proofreading',
        icon: PenLine,
    },
    {
        title: 'Layout & Desain Cover',
        description:
            'Penataan isi dan desain cover yang membantu karya Anda tampil profesional dan menarik.',
        href: '/layanan#layout-desain-cover',
        icon: Palette,
    },
    {
        title: 'Konsultasi Publikasi',
        description:
            'Diskusikan pemilihan layanan, strategi terbit, dan kebutuhan publikasi karya Anda bersama tim kami.',
        href: '/layanan#konsultasi-publikasi',
        icon: MessagesSquare,
    },
];

export const publishingSteps = [
    {
        no: '01',
        title: 'Kirim Naskah',
        description: 'Kirim naskah dan konsultasikan kebutuhan penerbitan.',
    },
    {
        no: '02',
        title: 'Review',
        description: 'Tim melakukan pemeriksaan awal terhadap naskah.',
    },
    {
        no: '03',
        title: 'Persetujuan',
        description: 'Penulis menyetujui proses dan layanan penerbitan.',
    },
    {
        no: '04',
        title: 'Editing & Layout',
        description: 'Naskah disunting, dilayout, dan dibuatkan desain cover.',
    },
    // {
    //     no: '05',
    //     title: 'ISBN & Produksi',
    //     description: 'Proses ISBN dan persiapan produksi buku.',
    // },
    {
        no: '05',
        title: 'Terbit & Distribusi',
        description: 'Buku diterbitkan dan siap didistribusikan.',
    },
] as const;

export const teamMembers = [
    {
        name: 'Muhammad Isbad Addainuri, M.E',
        role: 'Managing Director CV Taretan Media',
        image: '/images/team/isbad.jpeg',
    },
    {
        name: 'Moh. Sofwan Kastir Al Aziz, M.E',
        role: 'Publishing Director CV Taretan Media',
        image: '/images/team/sofwan.jpeg',
    },
] as const;
