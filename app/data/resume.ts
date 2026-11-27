export interface PersonalInfo {
  name: string
  title: string
  location: string
}

export interface Sections {
  aboutMe: string
  softSkills: string
  technicalSkills: string
  projects: string
  education: string
  experience: string
  certifications: string
  contact: string
}

export interface Project {
  name: string
  technology: string
  period: string
  description: string
  link?: string
}

export interface Education {
  institution: string
  period: string
  degree?: string
  gpa?: string
  relevantCoursework?: string
  grade?: string
  achievements?: string[]
}

export interface Experience {
  company: string
  position: string
  period: string
  responsibilities: string[]
}

export interface Certification {
  name: string
  issuer: string
  date: string
  credentialId?: string
  link: string
}

export interface Translation {
  personalInfo: PersonalInfo
  sections: Sections
  aboutMe: string[]
  skills: string[]
  projects: Project[]
  keyAbilities: string[]
  education: Education[]
  experience: Experience[]
  certifications: Certification[]
}

export interface Translations {
  en: Translation
  id: Translation
}

export interface NavigationLink {
  title: string
  link: string
}

export interface ContactInfo {
  title: string
  link: string
  displayText?: string
}

export type Language = 'en' | 'id'

export interface ShowcaseItem {
  id: number
  title: string
  description?: string
  date: string
  image: string
}

export interface TextAchievement {
  id: number
  title: string
  date: string
  description?: string
}

export const featuredAchievements: ShowcaseItem[] = [
  {
    id: 1,
    title: '1st Place in the 2024 MikroTik Networking Olympiad',
    date: '2024',
    image: 'https://ik.imagekit.io/fauzan/certificates/sertifikat-ojm-2024?updatedAt=1729822824599',
  },
  {
    id: 2,
    title: '3rd Place in the 2025 DIY Province ITNSA LKS',
    date: '2025',
    image: 'https://ik.imagekit.io/fauzan/certificates/sertifikat-lks-itnsa-2025?updatedAt=1729822824599',
  },
]

export const additionalAchievements: TextAchievement[] = [
  {
    id: 3,
    title: '2nd Place in the 2026 DIY Province LKS Cloud Computing',
    date: '2026',
  },
]

export const featuredCertificates: ShowcaseItem[] = [
  {
    id: 1,
    title: 'MikroTik Certified Network Associate (MTCNA)',
    date: '10 October 2024',
    image: 'https://ik.imagekit.io/fauzan/certificates/Sertifikat%20MTCNA%20Citraweb.png?updatedAt=1729822824599',
  },
  {
    id: 2,
    title: 'MikroTik Certified Traffic Control Engineer (MTCTCE)',
    date: '10 October 2024',
    image: 'https://ik.imagekit.io/fauzan/certificates/Sertifikat%20MTCTCE.png?updatedAt=1729822824599',
  },
  {
    id: 3,
    title: 'IPv6 Sage by Hurricane Electric',
    date: '29 January 2025',
    image: 'https://ik.imagekit.io/fauzan/certificates/ipv6-certificate.png?updatedAt=1729822824599',
  },
]

export const resumeTranslations: Translations = {
  en: {
    personalInfo: {
      name: 'Rizky Fauzan Hanif',
      title: 'Network Engineer',
      location: 'Sleman, Yogyakarta, Indonesia',
    },
    sections: {
      aboutMe: 'About Me',
      softSkills: 'Soft Skills',
      technicalSkills: 'Technical Skills',
      projects: 'Projects',
      education: 'Education',
      experience: 'Experience',
      certifications: 'Licenses & certifications',
      contact: 'Contact',
    },
    aboutMe: [
      "I'm Rizky Fauzan Hanif, a passionate Network Engineer with interests in Cloud Computing and DevOps, based in Sleman, Special Region of Yogyakarta. Currently, I am a student at SMK Negeri 2 Depok Sleman. I enjoy exploring and learning new technologies such as Kubernetes, Docker, virtualization, BGP, VPNs, firewalls, traffic control, IPv6, and network security.",
      'I have earned MikroTik Certified Network Associate (MTCNA), MikroTik Certified Traffic Control Engineer (MTCTCE), and IPv6 Sage by Hurricane Electric, as well as additional certifications in programming, cybersecurity, and cloud computing.',
      'I care about infrastructure that is reliable, maintainable, and scalable.',
    ],
    skills: [
      'MikroTik RouterOS - Routing, firewall, VPN, and traffic control configuration.',
      'Monitoring - SNMP Exporter, Node Exporter, Prometheus, Influxdb, Grafana, Beszel.',
      'IPv6 Implementation - Dual-stack configuration and IPv6 transition technologies with tunnel or native.',
      'Network Security - Firewall rules, VPN configuration, and access control.',
      'Linux Administration - Network services configuration and system administration.',
      'Virtualization - Proxmox VE, Libvirt, and LXD.',
      'Containerization - Docker and Kubernetes.',
      'Automation - Ansible and Terraform.',
      'Programming - Javascript, Typescript, Python, and Bash.',
      'CI/CD - GitHub Actions and GitLab CI/CD.',
    ],
    projects: [
      {
        name: 'Personal Website & Portfolio',
        technology: 'Nuxt 4, TypeScript, Tailwind CSS, Supabase',
        period: '2025 - Present',
        description: 'Personal portfolio website with responsive design and guestbook with multi-provider authentication.',
        link: 'https://rizkyfauzan.id',
      },
      {
        name: 'SMKN 2 Depok Sleman Network Infrastructure',
        technology: 'MikroTik RouterOS, Cambium, Ruijie, Firewall, Linux Server, Virtualization, Fiber Optics, VPN, Monitoring Tools',
        period: '2024 - Present',
        description: 'Monitoring, troubleshooting, and maintenance of school network infrastructure.',
      },
    ],
    keyAbilities: [
      'Systematic technical problem analysis and troubleshooting.',
      'Effective teamwork and communication skills.',
      'Quick adaptation to latest technologies.',
      'Time management and prioritization.',
      'Self-directed learning and continuous skill development.',
    ],
    education: [
      {
        institution: 'SMK Negeri 2 Depok Sleman',
        period: '2023 - 2027',
        degree: 'Network Information Systems and Applications',
        achievements: [
          '1st Place MikroTik Network Olympics 2024',
          '3rd Place LKS IT Network System Administration (ITNSA) DIY Province 2025',
          '2nd Place LKS Cloud Computing DIY Province 2026',
        ],
      },
    ],
    experience: [
      {
        company: 'SMK Negeri 2 Depok Sleman',
        position: 'Network Operations Center (Volunteer)',
        period: 'August 2024 - Present',
        responsibilities: [
          'Monitoring and maintaining network infrastructure.',
          'Troubleshooting connectivity and network performance issues.',
          'Configuring MikroTik, Ruijie, and Cambium network devices.',
          'Documenting configurations and maintenance procedures.',
        ],
      },
      {
        company: 'Raznar Hosting',
        position: 'Network Operations Center Engineer (Part-time)',
        period: 'September 2025 - Present',
        responsibilities: [
          'Set up VyOS routers for bare metal game servers with 10G uplink.',
          'Managed floating IPv4 for servers and virtual machines.',
          'Implemented IPv6 for scalable and future-ready networking.',
          'Deployed and managed Proxmox hypervisors for virtualization.',
          'Monitored network performance using Prometheus and Grafana.',
          'Deploy containerized applications using Portainer and Docker.',
          'Managed game server using Pterodactyl panel.',
        ],
      },
      {
        company: 'PT Solusi Karya Technology Indonesia (SKTECH)',
        position: 'DevOps Engineer (Part-time)',
        period: 'April 2025 - Present',
        responsibilities: [
          'Implemented CI/CD pipelines using Gitlab.',
          'Collaborated with development teams to optimize deployment processes.',
        ],
      },
    ],
    certifications: [
      {
        name: 'MikroTik Certified Network Associate (MTCNA)',
        issuer: 'MikroTik',
        date: '10 October 2024',
        credentialId: '2410NA5509',
        link: 'https://ik.imagekit.io/fauzan/certificates/Sertifikat%20MTCNA%20Citraweb.png?updatedAt=1729822824599',
      },
      {
        name: 'MikroTik Certified Traffic Control Engineer (MTCTCE)',
        issuer: 'MikroTik',
        date: '10 October 2024',
        credentialId: '2410TCE5618',
        link: 'https://ik.imagekit.io/fauzan/certificates/Sertifikat%20MTCTCE.png?updatedAt=1729822824599',
      },
      {
        name: 'Hurricane Electric IPv6 Sage',
        issuer: 'Hurricane Electric',
        date: '29 January 2025',
        link: 'https://ik.imagekit.io/fauzan/certificates/ipv6-certificate.png?updatedAt=1729822824599',
      },
      {
        name: 'Google Cybersecurity Professional Certificate V2',
        issuer: 'Credly (Google)',
        date: '22 May 2024',
        link: 'https://www.credly.com/badges/94f81a62-4b08-4839-8a42-f50972ff6c78',
      },
      {
        name: 'Connect and Protect: Networks and Network Security',
        issuer: 'Coursera (Google)',
        date: '10 May 2024',
        link: 'https://www.coursera.org/account/accomplishments/verify/7DEM3LJMQMF6',
      },
      {
        name: 'Foundations of Cybersecurity',
        issuer: 'Coursera (Google)',
        date: '26 April 2024',
        link: 'https://www.coursera.org/account/accomplishments/verify/UXPYSW35JY7Y',
      },
      {
        name: 'Preparing for Your Professional Cloud Network Engineer Journey',
        issuer: 'Google Skills',
        date: '18 May 2024',
        link: 'https://www.skills.google/public_profiles/fabd4c7c-80a9-441c-9663-7edc266ee498/badges/9063868',
      },
      {
        name: 'Belajar Dasar-Dasar DevOps',
        issuer: 'Dicoding',
        date: '12 October 2023',
        link: 'https://www.dicoding.com/certificates/53XE41G9VZRN',
      },
      {
        name: 'Belajar Dasar Cloud dan Gen AI di AWS',
        issuer: 'Dicoding',
        date: '19 December 2023',
        link: 'https://www.dicoding.com/certificates/1OP8N5O81XQK',
      },
      {
        name: 'Belajar Dasar Google Cloud',
        issuer: 'Dicoding',
        date: '15 October 2023',
        link: 'https://www.dicoding.com/certificates/GRX520J4RX0M',
      },
    ],
  },
  id: {
    personalInfo: {
      name: 'Rizky Fauzan Hanif',
      title: 'Network Engineer',
      location: 'Sleman, Yogyakarta, Indonesia',
    },
    sections: {
      aboutMe: 'Tentang Saya',
      softSkills: 'Keterampilan',
      technicalSkills: 'Keterampilan Teknis',
      projects: 'Proyek',
      education: 'Pendidikan',
      experience: 'Pengalaman',
      certifications: 'Lisensi & Sertifikasi',
      contact: 'Kontak',
    },
    aboutMe: [
      'Saya Rizky Fauzan Hanif, seorang Network Engineer yang memiliki minat pada Cloud Computing dan DevOps, berbasis di Sleman, Daerah Istimewa Yogyakarta. Saya siswa program studi Sistem Informasi Jaringan dan Aplikasi (SIJA) di SMK Negeri 2 Depok Sleman. Saya senang mengeksplorasi dan mempelajari teknologi baru seperti Kubernetes, Docker, virtualisasi, BGP, VPN, firewall, traffic control, IPv6, dan keamanan jaringan.',
      'Saya telah memperoleh MikroTik Certified Network Associate (MTCNA), MikroTik Certified Traffic Control Engineer (MTCTCE), dan IPv6 Sage oleh Hurricane Electric, serta sertifikasi tambahan dalam pemrograman, keamanan siber, dan cloud computing.',
      'Saya peduli terhadap infrastruktur yang andal, dapat dipelihara, dan skalabel.',
    ],
    skills: [
      'MikroTik RouterOS - Konfigurasi routing, firewall, VPN, dan traffic control.',
      'Monitoring - SNMP Exporter, Node Exporter, Prometheus, Influxdb, Grafana, Beszel.',
      'Implementasi IPv6 - Konfigurasi dual-stack dan teknologi transisi IPv6 dengan tunnel atau native.',
      'Keamanan Jaringan - Konfigurasi firewall, konfigurasi VPN, dan akses kontrol.',
      'Administrasi Linux - Konfigurasi layanan jaringan dan administrasi sistem.',
      'Virtualisasi - Proxmox VE, Libvirt, LXD.',
      'Kontainerisasi - Docker dan Kubernetes.',
      'Otomasi - Ansible dan Terraform.',
      'Pemrograman - Javascript, Typescript, Python, dan Bash.',
      'CI/CD - GitHub Actions dan GitLab CI/CD.',
    ],
    projects: [
      {
        name: 'Website & Portfolio Pribadi',
        technology: 'Nuxt 4, TypeScript, Tailwind CSS, Supabase',
        period: '2025 - Sekarang',
        description: 'Website portfolio pribadi dengan desain responsif dan halaman buku tamu dengan autentikasi multi-provider.',
        link: 'https://rizkyfauzan.id',
      },
      {
        name: 'Infrastruktur Jaringan SMKN 2 Depok Sleman',
        technology: 'MikroTik RouterOS, Cambium, Ruijie, Firewall, Linux Server, Virtualisasi, Fiber Optik, VPN, Alat Monitoring',
        period: '2024 - Sekarang',
        description: 'Monitoring, troubleshooting, dan pemeliharaan infrastruktur jaringan sekolah.',
      },
    ],
    keyAbilities: [
      'Analisis dan troubleshooting masalah teknis secara sistematis.',
      'Keterampilan kerja sama tim dan komunikasi yang efektif.',
      'Adaptasi cepat terhadap teknologi terbaru.',
      'Manajemen waktu dan prioritas dalam lingkungan kerja.',
      'Belajar secara mandiri dan mengembangkan keterampilan secara berkelanjutan.',
    ],
    education: [
      {
        institution: 'SMK Negeri 2 Depok Sleman',
        period: '2023 - 2027',
        degree: 'Sistem Informasi Jaringan dan Aplikasi',
        achievements: [
          'Juara 1 Olimpiade Jaringan MikroTik 2024',
          'Juara 3 LKS IT Network System Administration (ITNSA) Provinsi DIY 2025',
          'Juara 2 LKS Cloud Computing Provinsi DIY 2026',
        ],
      },
    ],
    experience: [
      {
        company: 'SMK Negeri 2 Depok Sleman',
        position: 'Network Operations Center (Sukarelawan)',
        period: 'Agustus 2024 - Sekarang',
        responsibilities: [
          'Monitoring dan pemeliharaan infrastruktur jaringan.',
          'Troubleshooting masalah konektivitas dan performa jaringan.',
          'Konfigurasi perangkat jaringan MikroTik, Ruijie, dan Cambium.',
          'Dokumentasi konfigurasi dan prosedur pemeliharaan.',
        ],
      },
      {
        company: 'Raznar Hosting',
        position: 'Network Operations Center Engineer (Paruh waktu)',
        period: 'September 2025 - Sekarang',
        responsibilities: [
          'Mengkonfigurasi router VyOS untuk bare metal game server.',
          'Mengelola floating IPv4 untuk server dan mesin virtual.',
          'Mengimplementasikan IPv6 untuk jaringan yang skalabel.',
          'Mendeploy dan mengelola hypervisor Proxmox untuk virtualisasi.',
          'Memonitor performa jaringan menggunakan Prometheus dan Grafana.',
          'Mendeploy aplikasi terkontainerisasi menggunakan Portainer dan Docker.',
          'Mengelola game server menggunakan panel Pterodactyl.',
        ],
      },
      {
        company: 'PT Solusi Karya Technology Indonesia (SKTECH)',
        position: 'DevOps Engineer (Paruh waktu)',
        period: 'April 2025 - Sekarang',
        responsibilities: [
          'Mengimplementasikan pipeline CI/CD menggunakan Gitlab.',
          'Berkolaborasi dengan tim pengembangan untuk mengoptimalkan proses deployment.',
        ],
      },
    ],
    certifications: [
      {
        name: 'MikroTik Certified Network Associate (MTCNA)',
        issuer: 'MikroTik',
        date: '10 Oktober 2024',
        credentialId: '2410NA5509',
        link: 'https://ik.imagekit.io/fauzan/certificates/Sertifikat%20MTCNA%20Citraweb.png?updatedAt=1729822824599',
      },
      {
        name: 'MikroTik Certified Traffic Control Engineer (MTCTCE)',
        issuer: 'MikroTik',
        date: '10 Oktober 2024',
        credentialId: '2410TCE5618',
        link: 'https://ik.imagekit.io/fauzan/certificates/Sertifikat%20MTCTCE.png?updatedAt=1729822824599',
      },
      {
        name: 'Hurricane Electric IPv6 Sage',
        issuer: 'Hurricane Electric',
        date: '29 Januari 2025',
        link: 'https://ik.imagekit.io/fauzan/certificates/ipv6-certificate.png?updatedAt=1729822824599',
      },
      {
        name: 'Google Cybersecurity Professional Certificate V2',
        issuer: 'Credly (Google)',
        date: '22 Mei 2024',
        link: 'https://www.credly.com/badges/94f81a62-4b08-4839-8a42-f50972ff6c78',
      },
      {
        name: 'Connect and Protect: Networks and Network Security',
        issuer: 'Coursera (Google)',
        date: '10 Mei 2024',
        link: 'https://www.coursera.org/account/accomplishments/verify/7DEM3LJMQMF6',
      },
      {
        name: 'Foundations of Cybersecurity',
        issuer: 'Coursera (Google)',
        date: '26 April 2024',
        link: 'https://www.coursera.org/account/accomplishments/verify/UXPYSW35JY7Y',
      },
      {
        name: 'Preparing for Your Professional Cloud Network Engineer Journey',
        issuer: 'Google Skills',
        date: '18 Mei 2024',
        link: 'https://www.skills.google/public_profiles/fabd4c7c-80a9-441c-9663-7edc266ee498/badges/9063868',
      },
      {
        name: 'Belajar Dasar-Dasar DevOps',
        issuer: 'Dicoding',
        date: '12 Oktober 2023',
        link: 'https://www.dicoding.com/certificates/53XE41G9VZRN',
      },
      {
        name: 'Belajar Dasar Cloud dan Gen AI di AWS',
        issuer: 'Dicoding',
        date: '19 Desember 2023',
        link: 'https://www.dicoding.com/certificates/1OP8N5O81XQK',
      },
      {
        name: 'Belajar Dasar Google Cloud',
        issuer: 'Dicoding',
        date: '15 Oktober 2023',
        link: 'https://www.dicoding.com/certificates/GRX520J4RX0M',
      },
    ],
  },
}

export const additionalCertificates: Certification[] = resumeTranslations.en.certifications.slice(3)

export const resumeNavigationLinks: NavigationLink[] = [
  {
    title: 'Website',
    link: 'https://rizkyfauzan.id',
  },
  {
    title: 'Email',
    link: 'mailto:contact@rizkyfauzan.id',
  },
  {
    title: 'LinkedIn',
    link: 'https://linkedin.com/in/rizky-fauzan-hanif',
  },
]

export const resumeContactInfo: ContactInfo[] = [
  {
    title: 'Website',
    link: 'https://rizkyfauzan.id',
    displayText: 'rizkyfauzan.id',
  },
  {
    title: 'Email',
    link: 'mailto:contact@rizkyfauzan.id',
    displayText: 'contact@rizkyfauzan.id',
  },
  {
    title: 'LinkedIn',
    link: 'https://linkedin.com/in/rizky-fauzan-hanif',
    displayText: 'linkedin.com/in/rizky-fauzan-hanif',
  },
  {
    title: 'GitHub',
    link: 'https://github.com/fzzzn',
    displayText: 'github.com/fzzzn',
  },
]
