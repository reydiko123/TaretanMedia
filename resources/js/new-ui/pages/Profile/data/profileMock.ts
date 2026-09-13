import type { ProfileProps } from "@/new-ui/pages/Profile/profileTypes"
import { homeContact } from "@/new-ui/pages/Home/data/homeContact"

// Fixture lokal untuk preview/test; bukan sumber data production dan tidak berisi kontak personal.
export const completeProfileProps = {
  site: {
    name: "Taretan Media",
    tagline: "Mitra terpercaya bagi setiap penulis dalam membawa gagasan dan hasil penelitian menjadi karya yang bernilai, layak terbit, dan memiliki dampak akademik yang lebih luas.",
    shortDescription: "Lembaga penerbitan buku, jurnal ilmiah, dan pendampingan publikasi akademik.",
    about: "",
    vision: "",
    mission: [],
    values: [],
  },
  contact: homeContact,
  profile: {
    about: "Taretan Media merupakan lembaga yang bergerak di bidang penerbitan buku, jurnal ilmiah, dan pendampingan publikasi akademik. Taretan Media hadir sebagai mitra bagi akademisi, peneliti, dosen, mahasiswa, dan penulis dalam mengembangkan serta menyebarluaskan karya intelektual melalui publikasi yang berkualitas dan profesional.\n\nDalam menjalankan aktivitasnya, Taretan Media tidak hanya berfokus pada proses penerbitan, tetapi juga memberikan pendampingan dalam pengembangan dan persiapan berita ilmiah menuju publikasi. Pendampingan dilakukan untuk membantu penulis meningkatkan kualitas substansi, sistematika, bahasa akademik, kesesuaian dengan ketentuan jurnal, hingga kesiapan naskah untuk diajukan pada jurnal yang sesuai dengan bidang dan tujuan publikasinya.\n\nTaretan Media berkomitmen membangun ekosistem publikasi yang mengedepankan kualitas, integritas akademik, profesionalisme, dan kemitraan. Kami percaya bahwa karya ilmiah yang baik tidak berhenti pada proses penulisan, tetapi perlu dikembangkan, disiapkan, diterbitkan, dan disebarluaskan agar dapat memberikan manfaat yang lebih luas bagi perkembangan ilmu pengetahuan dan masyarakat.",
    vision: "Menjadi mitra publikasi akademik yang terpercaya dan profesional dalam menerbitkan serta mengembangkan karya ilmiah berkualitas untuk mendukung kemajuan ilmu pengetahuan di tingkat nasional dan internasional.",
    mission: [
      "Menyelenggarakan penerbitan buku dan jurnal ilmiah yang berkualitas dengan mengedepankan standar profesional dan integritas akademik.",
      "Memberikan pendampingan publikasi yang profesional dan berorientasi pada kualitas, sehingga penulis mampu mempersiapkan berita ilmiahnya secara lebih baik dan sesuai dengan standar publikasi yang dituju.",
      "Mendukung akademisi, peneliti, dosen, mahasiswa, dan penulis dalam mengembangkan gagasan, hasil penelitian, dan karya intelektual menjadi publikasi yang bernilai.",
      "Membangun proses penerbitan yang transparan, bertanggung jawab, dan beretika, dengan menjunjung tinggi integritas serta etika dalam publikasi ilmiah.",
      "Mengembangkan jejaring dan kolaborasi dengan akademisi, peneliti, perguruan tinggi, lembaga, dan komunitas ilmiah untuk memperluas ekosistem publikasi dan pertukaran pengetahuan.",
      "Memperluas akses dan dampak karya ilmiah melalui pemanfaatan teknologi dan media publikasi digital sehingga pengetahuan dapat menjangkau pembaca dan komunitas akademik yang lebih luas.",
    ],
    values: [
      { title: "Kualitas", description: "Karya ilmiah dikembangkan, disiapkan, dan diterbitkan dengan standar profesional yang terjaga." },
      { title: "Integritas Akademik", description: "Proses publikasi dijalankan dengan kejujuran dan etika akademik yang konsisten." },
      { title: "Profesionalisme", description: "Pendampingan dan penerbitan dilakukan secara profesional dari naskah hingga terbit." },
      { title: "Kemitraan", description: "Taretan Media menjadi mitra terpercaya bagi penulis dalam menerbitkan karyanya." },
    ],
  },
} satisfies ProfileProps

export const minimalProfileProps = {
  site: {
    name: "Taretan Media",
    tagline: "",
    shortDescription: "Penerbitan yang bertumbuh bersama penulis.",
    about: "Tentang dari site.",
    vision: "Visi dari site.",
    mission: ["Mendampingi karya dengan perhatian."],
    values: [],
  },
  contact: {},
  profile: {
    about: " ",
    vision: " ",
    mission: ["Misi dari profil."],
    values: [{ title: "Kolaboratif", description: "Bekerja bersama secara terbuka." }],
  },
} satisfies ProfileProps

export const emptyProfileProps = {
  site: {
    name: "Taretan Media",
    tagline: "",
    shortDescription: "",
    about: " ",
    vision: " ",
    mission: [],
    values: [],
  },
  contact: {},
  profile: {
    about: " ",
    vision: " ",
    mission: [],
    values: [],
  },
} satisfies ProfileProps

export function getLocalProfileProps(): ProfileProps {
  return completeProfileProps
}
