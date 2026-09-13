<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Initial Admin Credentials
    |--------------------------------------------------------------------------
    |
    | Used by the idempotent AdminSeeder to create the initial admin account.
    | Values come from the environment and must never be committed. The seeder
    | rejects empty values and never logs the password.
    |
    */

    'admin' => [
        'username' => env('ADMIN_USERNAME'),
        'password' => env('ADMIN_PASSWORD'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Public Contact Configuration
    |--------------------------------------------------------------------------
    |
    | Public-safe values surfaced to visitors (WhatsApp deep links, contact
    | channels). Sourced from the environment per PRD Q9-C.
    |
    */

    'whatsapp_number' => env('WHATSAPP_NUMBER'),
    'whatsapp' => [
        'number' => env('WHATSAPP_NUMBER'),
        'templates' => [
            'book' => 'Halo Taretan Media, saya ingin menanyakan buku ":title". :url',
            'service' => 'Halo Taretan Media, saya ingin berkonsultasi tentang layanan ":service".',
            'manuscript' => "Halo Taretan Media, saya ingin berkonsultasi tentang naskah.\nNama: :name\nEmail: :email\nJudul: :title\nJenis: :publication_type",
            'contact' => 'Halo Taretan Media, saya ingin meminta informasi.',
        ],
        'publication_types' => ['Buku', 'Jurnal', 'Berita'],
    ],
    'analytics' => [
        'enabled' => (bool) env('ANALYTICS_ENABLED', false),
        'driver' => env('ANALYTICS_DRIVER', 'none'),
        'endpoint' => env('ANALYTICS_ENDPOINT'),
    ],
    'contact_email' => env('CONTACT_EMAIL'),
    'social' => [
        'instagram_url' => env('SOCIAL_INSTAGRAM_URL'),
    ],
    'maps_url' => env('MAPS_URL'),

    'public' => [
        'name' => env('PUBLIC_SITE_NAME', env('APP_NAME', 'Taretan Media')),
        'tagline' => env('PUBLIC_SITE_TAGLINE', 'Mitra terpercaya bagi setiap penulis dalam membawa gagasan dan hasil penelitian menjadi karya yang bernilai, layak terbit, dan memiliki dampak akademik yang lebih luas.'),
        'address' => env('PUBLIC_ADDRESS'),
        'profile' => [
            'summary' => env('PUBLIC_PROFILE_SUMMARY', "Taretan Media merupakan lembaga yang bergerak di bidang penerbitan buku, jurnal ilmiah, dan pendampingan publikasi akademik. Taretan Media hadir sebagai mitra bagi akademisi, peneliti, dosen, mahasiswa, dan penulis dalam mengembangkan serta menyebarluaskan karya intelektual melalui publikasi yang berkualitas dan profesional.\n\nDalam menjalankan aktivitasnya, Taretan Media tidak hanya berfokus pada proses penerbitan, tetapi juga memberikan pendampingan dalam pengembangan dan persiapan berita ilmiah menuju publikasi. Pendampingan dilakukan untuk membantu penulis meningkatkan kualitas substansi, sistematika, bahasa akademik, kesesuaian dengan ketentuan jurnal, hingga kesiapan naskah untuk diajukan pada jurnal yang sesuai dengan bidang dan tujuan publikasinya.\n\nTaretan Media berkomitmen membangun ekosistem publikasi yang mengedepankan kualitas, integritas akademik, profesionalisme, dan kemitraan. Kami percaya bahwa karya ilmiah yang baik tidak berhenti pada proses penulisan, tetapi perlu dikembangkan, disiapkan, diterbitkan, dan disebarluaskan agar dapat memberikan manfaat yang lebih luas bagi perkembangan ilmu pengetahuan dan masyarakat."),
            'vision' => env('PUBLIC_PROFILE_VISION', 'Menjadi mitra publikasi akademik yang terpercaya dan profesional dalam menerbitkan serta mengembangkan karya ilmiah berkualitas untuk mendukung kemajuan ilmu pengetahuan di tingkat nasional dan internasional.'),
            'mission' => [
                'Menyelenggarakan penerbitan buku dan jurnal ilmiah yang berkualitas dengan mengedepankan standar profesional dan integritas akademik.',
                'Memberikan pendampingan publikasi yang profesional dan berorientasi pada kualitas, sehingga penulis mampu mempersiapkan berita ilmiahnya secara lebih baik dan sesuai dengan standar publikasi yang dituju.',
                'Mendukung akademisi, peneliti, dosen, mahasiswa, dan penulis dalam mengembangkan gagasan, hasil penelitian, dan karya intelektual menjadi publikasi yang bernilai.',
                'Membangun proses penerbitan yang transparan, bertanggung jawab, dan beretika, dengan menjunjung tinggi integritas serta etika dalam publikasi ilmiah.',
                'Mengembangkan jejaring dan kolaborasi dengan akademisi, peneliti, perguruan tinggi, lembaga, dan komunitas ilmiah untuk memperluas ekosistem publikasi dan pertukaran pengetahuan.',
                'Memperluas akses dan dampak karya ilmiah melalui pemanfaatan teknologi dan media publikasi digital sehingga pengetahuan dapat menjangkau pembaca dan komunitas akademik yang lebih luas.',
            ],
            'values' => ['Kualitas', 'Integritas Akademik', 'Profesionalisme', 'Kemitraan'],
        ],
    ],

];
