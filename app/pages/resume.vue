<script setup>
definePageMeta({
    layout: 'blank',
})

useSeoMeta({
    title: 'Resume - Rizky Fauzan Hanif',
    description: 'Professional resume of Rizky Fauzan Hanif - Network Engineer',
    ogTitle: 'Resume - Rizky Fauzan Hanif',
    ogDescription: 'Professional resume of Rizky Fauzan Hanif - Network Engineer',
})

const currentLang = ref('en')

// Load language from localStorage on mount
onMounted(() => {
    const savedLang = localStorage.getItem('resume-language')
    if (savedLang && (savedLang === 'en' || savedLang === 'id')) {
        currentLang.value = savedLang
    }
})

const toggleLanguage = () => {
    currentLang.value = currentLang.value === 'en' ? 'id' : 'en'
    localStorage.setItem('resume-language', currentLang.value)
}

const translations = {
    en: {
        personalInfo: {
            name: 'Rizky Fauzan Hanif',
            title: 'Network Engineer',
            location: 'Sleman, Yogyakarta, Indonesia',
        },
        sections: {
            professionalSummary: 'Professional Summary',
            softSkills: 'Soft Skills',
            technicalSkills: 'Technical Skills',
            projects: 'Projects',
            education: 'Education',
            experience: 'Experience',
            certifications: 'Licenses & certifications',
            contact: 'Contact',
        },
        professionalSummary: [
            "I'm Rizky Fauzan Hanif, a passionate Network Engineer with interests in Cloud Computing and DevOps, based in Sleman, Special Region of Yogyakarta. Currently, I am a student at SMK Negeri 2 Depok Sleman. I enjoy exploring and learning new technologies such as Kubernetes, Docker, virtualization, BGP, VPNs, firewalls, traffic control, IPv6, and network security.",
            "To deepen my knowledge, I have earned MikroTik Certified Network Associate (MTCNA), MikroTik Certified Traffic Control Engineer (MTCTCE), and IPv6 Sage by Hurricane Electric, as well as additional certifications in programming, cybersecurity, and cloud computing.",
            "I care about infrastructure that is reliable, maintainable, and scalable."
        ],
        skills: [
            'MikroTik RouterOS - Routing, firewall, VPN, and traffic control configuration',
            'Monitoring - SNMP Exporter, Node Exporter, Prometheus, Influxdb, Grafana, Beszel',
            'IPv6 Implementation - Dual-stack configuration and IPv6 transition technologies with tunnel or native',
            'Network Security - Firewall rules, VPN configuration, and access control',
            'Linux Administration - Network services configuration and system administration',
            'Virtualization - Proxmox VE and Libvirt',
            'Containerization - Docker and Kubernetes',
            'Automation - Ansible and Terraform',
            'Programming - Javascript, Typescript, Python, and Bash',
            'CI/CD - GitHub Actions and GitLab CI/CD',
        ],
        projects: [
            {
                name: 'Personal Website & Portfolio',
                technology: 'Nuxt 3, TypeScript, Tailwind CSS, Supabase',
                period: '2025 - Present',
                description: 'Personal portfolio website with responsive design and guestbook with multi-provider authentication.',
                link: 'https://rizkyfauzan.id'
            },
            {
                name: 'SMKN 2 Depok Sleman Network Infrastructure',
                technology: 'MikroTik RouterOS, Cambium, Ruijie, Firewall, Linux Server, Virtualization, Fiber Optics, VPN, Monitoring Tools',
                period: '2024 - Present',
                description: 'Monitoring, troubleshooting, and maintenance of school network infrastructure.'
            }
        ],
        keyAbilities: [
            'Systematic network problem analysis and troubleshooting',
            'Effective teamwork and communication skills',
            'Quick adaptation to latest networking technologies',
            'Time management and prioritization in dynamic work environments',
            'Self-directed learning and continuous skill development',
        ],
        education: [
            {
                institution: 'SMK Negeri 2 Depok Sleman',
                period: '2023 - 2027',
                degree: 'Network Information Systems and Applications',
                achievements: [
                    '1st Place MikroTik Network Olympics 2024',
                    '3rd Place LKS IT Network System Administration (ITNSA) DIY Province 2024',
                ]
            },
            {
                institution: 'SMP Negeri 2 Ngaglik',
                period: '2020 - 2023',
            }
        ],
        experience: [
            {
                company: 'SMK Negeri 2 Depok Sleman',
                position: 'Network Operations Center (Volunteer)',
                period: 'August 2024 - Present',
                responsibilities: [
                    'Monitoring and maintaining network infrastructure',
                    'Troubleshooting connectivity and network performance issues',
                    'Configuring MikroTik, Ruijie, and Cambium network devices',
                    'Documenting configurations and maintenance procedures'
                ]
            },
            {
                company: 'Raznar Hosting',
                position: 'Network Operations Center Engineer',
                period: 'September 2025 - Present',
                responsibilities: [
                    'Set up VyOS routers for bare metal game servers with 10G uplink.',
                    'Managed floating IPv4 for servers and virtual machines.',
                    'Implemented IPv6 for scalable and future-ready networking.',
                    'Deployed and managed Proxmox hypervisors for virtualization.',
                    'Monitored network performance using Prometheus and Grafana.',
                    'Deploy containerized applications using Portainer and Docker.',
                    'Managed game server using Pterodactyl panel.'
                ]
            },
            {
                company: 'PT Solusi Karya Technology Indonesia (SKTECH)',
                position: 'DevOps Engineer',
                period: 'April 2025 - Present',
                responsibilities: [
                    'Implemented CI/CD pipelines using Gitlab.',
                    'Collaborated with development teams to optimize deployment processes.'
                ]
            }
        ],
        certifications: [
            {
                name: 'MikroTik Certified Network Associate (MTCNA)',
                issuer: 'MikroTik',
                date: '10 October 2024',
                credentialId: '2410NA5509',
                link: "https://ik.imagekit.io/fauzan/certificates/Sertifikat%20MTCNA%20Citraweb.png?updatedAt=1729822824599"
            },
            {
                name: 'MikroTik Certified Traffic Control Engineer (MTCTCE)',
                issuer: 'MikroTik',
                date: '10 October 2024',
                credentialId: '2410TCE5618',
                link: "https://ik.imagekit.io/fauzan/certificates/Sertifikat%20MTCTCE.png?updatedAt=1729822824599"
            },
            {
                name: 'Hurricane Electric IPv6 Sage',
                issuer: 'Hurricane Electric',
                date: '29 January 2025',
                link: "https://ik.imagekit.io/fauzan/certificates/ipv6-certificate.png?updatedAt=1729822824599"
            },
            {
                name: 'Google Cybersecurity Professional Certificate V2',
                issuer: 'Credly (Google)',
                date: '22 May 2024',
                link: 'https://www.credly.com/badges/94f81a62-4b08-4839-8a42-f50972ff6c78'
            },
            {
                name: 'Connect and Protect: Networks and Network Security',
                issuer: 'Coursera (Google)',
                date: '10 May 2024',
                link: 'https://www.coursera.org/account/accomplishments/verify/7DEM3LJMQMF6'
            },
            {
                name: 'Foundations of Cybersecurity',
                issuer: 'Coursera (Google)',
                date: '26 April 2024',
                link: 'https://www.coursera.org/account/accomplishments/verify/UXPYSW35JY7Y'
            },
            {
                name: 'Preparing for Your Professional Cloud Network Engineer Journey',
                issuer: 'Google Skills',
                date: '18 May 2024',
                link: 'https://www.skills.google/public_profiles/fabd4c7c-80a9-441c-9663-7edc266ee498/badges/9063868'
            },
            {
                name: 'Belajar Dasar-Dasar DevOps',
                issuer: 'Dicoding',
                date: '12 October 2023',
                link: 'https://www.dicoding.com/certificates/53XE41G9VZRN'
            },
            {
                name: 'Belajar Dasar Cloud dan Gen AI di AWS',
                issuer: 'Dicoding',
                date: '19 December 2023',
                link: 'https://www.dicoding.com/certificates/1OP8N5O81XQK'
            },
            {
                name: 'Belajar Dasar Google Cloud',
                issuer: 'Dicoding',
                date: '15 October 2023',
                link: 'https://www.dicoding.com/certificates/GRX520J4RX0M'
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
            professionalSummary: 'Ringkasan',
            softSkills: 'Keterampilan',
            technicalSkills: 'Keterampilan Teknis',
            projects: 'Proyek',
            education: 'Pendidikan',
            experience: 'Pengalaman',
            certifications: 'Lisensi & Sertifikasi',
            contact: 'Kontak',
        },
        professionalSummary: [
            "Saya Rizky Fauzan Hanif, seorang Network Engineer yang memiliki minat pada Cloud Computing dan DevOps, berbasis di Sleman, Daerah Istimewa Yogyakarta. Saat ini, saya adalah siswa di SMK Negeri 2 Depok Sleman. Saya senang mengeksplorasi dan mempelajari teknologi baru seperti Kubernetes, Docker, virtualisasi, BGP, VPN, firewall, traffic control, IPv6, dan keamanan jaringan.",
            "Untuk memperdalam pengetahuan saya, saya telah memperoleh MikroTik Certified Network Associate (MTCNA), MikroTik Certified Traffic Control Engineer (MTCTCE), dan IPv6 Sage oleh Hurricane Electric, serta sertifikasi tambahan dalam pemrograman, keamanan siber, dan cloud computing.",
            "Saya peduli terhadap infrastruktur yang andal, dapat dipelihara, dan skalabel."
        ],
        skills: [
            'MikroTik RouterOS - Konfigurasi routing, firewall, VPN, dan traffic control',
            'Monitoring - SNMP Exporter, Node Exporter, Prometheus, Influxdb, Grafana, Beszel',
            'Implementasi IPv6 - Konfigurasi dual-stack dan teknologi transisi IPv6 dengan tunnel atau native',
            'Keamanan Jaringan - Konfigurasi firewall, konfigurasi VPN, dan akses kontrol',
            'Administrasi Linux - Konfigurasi layanan jaringan dan administrasi sistem',
            'Virtualisasi - Proxmox VE dan Libvirt',
            'Kontainerisasi - Docker dan Kubernetes',
            'Otomasi - Ansible dan Terraform',
            'Pemrograman - Javascript, Typescript, Python, dan Bash',
            'CI/CD - GitHub Actions dan GitLab CI/CD',
        ],
        projects: [
            {
                name: 'Website & Portfolio Pribadi',
                technology: 'Nuxt 3, TypeScript, Tailwind CSS, Supabase',
                period: '2025 - Sekarang',
                description: 'Website portfolio pribadi dengan desain responsif dan buku tamu dengan autentikasi multi-provider.',
                link: 'https://rizkyfauzan.id'
            },
            {
                name: 'Infrastruktur Jaringan SMKN 2 Depok Sleman',
                technology: 'MikroTik RouterOS, Cambium, Ruijie, Firewall, Linux Server, Virtualisasi, Fiber Optik, VPN, Alat Monitoring',
                period: '2024 - Sekarang',
                description: 'Monitoring, troubleshooting, dan pemeliharaan infrastruktur jaringan sekolah.'
            }
        ],
        keyAbilities: [
            'Analisis dan troubleshooting masalah jaringan secara sistematis',
            'Keterampilan kerja sama tim dan komunikasi yang efektif',
            'Adaptasi cepat terhadap teknologi jaringan terkini',
            'Manajemen waktu dan prioritas dalam lingkungan kerja yang dinamis',
            'Pembelajaran mandiri dan pengembangan keterampilan berkelanjutan',
        ],
        education: [
            {
                institution: 'SMK Negeri 2 Depok Sleman',
                period: '2023 - 2027',
                degree: 'Sistem Informasi Jaringan dan Aplikasi',
                achievements: [
                    'Juara 1 Olimpiade Jaringan MikroTik 2024',
                    'Juara 3 LKS IT Network System Administration (ITNSA) Provinsi DIY 2024',
                ]
            },
            {
                institution: 'SMP Negeri 2 Ngaglik',
                period: '2020 - 2023',
            }
        ],
        experience: [
            {
                company: 'SMK Negeri 2 Depok Sleman',
                position: 'Network Operations Center (Relawan)',
                period: 'Agustus 2024 - Sekarang',
                responsibilities: [
                    'Monitoring dan pemeliharaan infrastruktur jaringan',
                    'Troubleshooting masalah konektivitas dan performa jaringan',
                    'Konfigurasi perangkat jaringan MikroTik, Ruijie, dan Cambium',
                    'Dokumentasi konfigurasi dan prosedur pemeliharaan'
                ]
            },
            {
                company: 'Raznar Hosting',
                position: 'Network Operations Center Engineer',
                period: 'September 2025 - Sekarang',
                responsibilities: [
                    'Mengkonfigurasi router VyOS untuk bare metal game server dengan uplink 10G.',
                    'Mengelola floating IPv4 untuk server dan mesin virtual.',
                    'Mengimplementasikan IPv6 untuk jaringan yang skalabel.',
                    'Mendeploy dan mengelola hypervisor Proxmox untuk virtualisasi.',
                    'Memonitor performa jaringan menggunakan Prometheus dan Grafana.',
                    'Mendeploy aplikasi terkontainerisasi menggunakan Portainer dan Docker.',
                    'Mengelola game server menggunakan panel Pterodactyl.'
                ]
            },
            {
                company: 'PT Solusi Karya Technology Indonesia (SKTECH)',
                position: 'DevOps Engineer',
                period: 'April 2025 - Sekarang',
                responsibilities: [
                    'Mengimplementasikan pipeline CI/CD menggunakan Gitlab.',
                    'Berkolaborasi dengan tim pengembangan untuk mengoptimalkan proses deployment.'
                ]
            }
        ],
        certifications: [
            {
                name: 'MikroTik Certified Network Associate (MTCNA)',
                issuer: 'MikroTik',
                date: '10 Oktober 2024',
                credentialId: '2410NA5509',
                link: "https://ik.imagekit.io/fauzan/certificates/Sertifikat%20MTCNA%20Citraweb.png?updatedAt=1729822824599"
            },
            {
                name: 'MikroTik Certified Traffic Control Engineer (MTCTCE)',
                issuer: 'MikroTik',
                date: '10 Oktober 2024',
                credentialId: '2410TCE5618',
                link: "https://ik.imagekit.io/fauzan/certificates/Sertifikat%20MTCTCE.png?updatedAt=1729822824599"
            },
            {
                name: 'Hurricane Electric IPv6 Sage',
                issuer: 'Hurricane Electric',
                date: '29 Januari 2025',
                link: "https://ik.imagekit.io/fauzan/certificates/ipv6-certificate.png?updatedAt=1729822824599"
            },
            {
                name: 'Google Cybersecurity Professional Certificate V2',
                issuer: 'Credly (Google)',
                date: '22 Mei 2024',
                link: 'https://www.credly.com/badges/94f81a62-4b08-4839-8a42-f50972ff6c78'
            },
            {
                name: 'Connect and Protect: Networks and Network Security',
                issuer: 'Coursera (Google)',
                date: '10 Mei 2024',
                link: 'https://www.coursera.org/account/accomplishments/verify/7DEM3LJMQMF6'
            },
            {
                name: 'Foundations of Cybersecurity',
                issuer: 'Coursera (Google)',
                date: '26 April 2024',
                link: 'https://www.coursera.org/account/accomplishments/verify/UXPYSW35JY7Y'
            },
            {
                name: 'Preparing for Your Professional Cloud Network Engineer Journey',
                issuer: 'Google Skills',
                date: '18 Mei 2024',
                link: 'https://www.skills.google/public_profiles/fabd4c7c-80a9-441c-9663-7edc266ee498/badges/9063868'
            },
            {
                name: 'Belajar Dasar-Dasar DevOps',
                issuer: 'Dicoding',
                date: '12 Oktober 2023',
                link: 'https://www.dicoding.com/certificates/53XE41G9VZRN'
            },
            {
                name: 'Belajar Dasar Cloud dan Gen AI di AWS',
                issuer: 'Dicoding',
                date: '19 Desember 2023',
                link: 'https://www.dicoding.com/certificates/1OP8N5O81XQK'
            },
            {
                name: 'Belajar Dasar Google Cloud',
                issuer: 'Dicoding',
                date: '15 Oktober 2023',
                link: 'https://www.dicoding.com/certificates/GRX520J4RX0M'
            },
        ],
    }
}

const t = computed(() => translations[currentLang.value])

const navigationLinks = [
    {
        title: 'Email',
        link: 'mailto:contact@rizkyfauzan.id'
    },
    {
        title: 'LinkedIn',
        link: 'https://linkedin.com/in/rizky-fauzan-hanif'
    },
    {
        title: 'GitHub',
        link: 'https://github.com/fzzzn'
    },
    {
        title: 'Website',
        link: 'https://rizkyfauzan.id'
    },
]

const contactInfo = [
    {
        title: 'Email',
        link: 'mailto:contact@rizkyfauzan.id',
        displayText: 'contact@rizkyfauzan.id'
    },
    {
        title: 'Website',
        link: 'https://rizkyfauzan.id',
        displayText: 'rizkyfauzan.id'
    },
    {
        title: 'LinkedIn',
        link: 'https://linkedin.com/in/rizky-fauzan-hanif',
        displayText: 'linkedin.com/in/rizky-fauzan-hanif'
    },
]

const printResume = () => {
    window.print()
}
</script>

<template>
    <div class="max-w-3xl w-11/12 mx-auto">
        <main class="py-4 print:text-black">
            <!-- Header Section -->
            <section class="w-full mt-4 mb-4">
                <h1 class="text-center text-3xl font-bold text-black">
                    {{ t.personalInfo.name }}
                </h1>
                <h2 class="text-center text-lg text-gray-700 mt-1">
                    {{ t.personalInfo.title }}
                </h2>
                <p class="text-center text-sm text-gray-600 mt-1">
                    {{ t.personalInfo.location }}
                </p>
                <div class="space-x-4 text-center mt-3">
                    <a v-for="navLink in navigationLinks" :key="navLink.title" :href="navLink.link"
                        :target="navLink.title !== 'Email' ? '_blank' : undefined"
                        :rel="navLink.title !== 'Email' ? 'noopener noreferrer' : undefined"
                        class="relative inline-flex items-center print:underline hover:underline text-black font-semibold hover:after:w-full print:text-black">
                        {{ navLink.title }}
                    </a>
                </div>
            </section>

            <div class="space-y-8">
                <!-- Professional Summary -->
                <section>
                    <div class="flex items-center justify-between pb-2.5 border-b-2 border-black">
                        <h3 class="text-xl font-bold text-black">{{ t.sections.professionalSummary }}</h3>
                        <div class="flex items-center gap-2">
                            <button
                                class="inline-flex items-center justify-center cursor-pointer print:hidden px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                                @click="toggleLanguage">
                                <span class="text-sm font-medium text-black">{{ currentLang === 'en' ? 'ID' : 'EN'
                                    }}</span>
                            </button>
                            <button
                                class="inline-flex items-center justify-center cursor-pointer print:hidden px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                                @click="printResume">
                                <Icon name="heroicons:printer" class="text-black text-lg" />
                            </button>
                        </div>
                    </div>
                    <div class="mt-4">
                        <p v-for="(paragraph, idx) in t.professionalSummary" :key="idx" class="text-gray-800 mb-2">{{
                            paragraph }}</p>
                    </div>
                </section>

                <!-- Soft Skills -->
                <section>
                    <h3 class="mb-4 pb-2.5 border-b-2 border-black text-xl font-bold text-black">
                        {{ t.sections.softSkills }}
                    </h3>
                    <ul class="list-disc list-inside [&>li]:my-1">
                        <li v-for="ability in t.keyAbilities" :key="ability" class="text-gray-800">
                            {{ ability }}
                        </li>
                    </ul>
                </section>

                <!-- Technical Skills -->
                <section>
                    <h3 class="mb-4 pb-2.5 border-b-2 border-black text-xl font-bold text-black">
                        {{ t.sections.technicalSkills }}
                    </h3>
                    <ul class="list-disc list-inside [&>li]:my-1">
                        <li v-for="skill in t.skills" :key="skill" class="text-gray-800">
                            {{ skill }}
                        </li>
                    </ul>
                </section>

                <!-- Education -->
                <section>
                    <h3 class="pb-2.5 border-b-2 border-black text-xl font-bold text-black">
                        {{ t.sections.education }}
                    </h3>
                    <div v-for="edu in t.education" :key="edu.institution" class="mt-4">
                        <div class="flex items-start justify-between mb-2.5">
                            <h4 class="max-w-md font-semibold text-black">{{ edu.institution }}</h4>
                            <p class="text-sm font-semibold text-gray-700">{{ edu.period }}</p>
                        </div>
                        <p v-if="edu.degree" class="text-gray-800 mb-1">{{ edu.degree }}</p>
                        <p v-if="edu.gpa" class="text-gray-700 text-sm mb-1">{{ edu.gpa }}</p>
                        <p v-if="edu.relevantCoursework" class="text-gray-700 text-sm mb-2">
                            <strong>Relevant Coursework: </strong>
                            {{ edu.relevantCoursework }}
                        </p>
                        <p v-if="edu.grade" class="text-gray-700 text-sm mb-2">{{ edu.grade }}</p>
                        <ul v-if="edu.achievements" class="list-disc list-inside [&>li]:my-1">
                            <li v-for="achievement in edu.achievements" :key="achievement" class="text-gray-800">
                                {{ achievement }}
                            </li>
                        </ul>
                    </div>
                </section>

                <!-- Experience -->
                <section>
                    <div class="flex items-center justify-between pb-2.5 border-b-2 border-black">
                        <h3 class="text-xl font-bold text-black">{{ t.sections.experience }}</h3>
                    </div>
                    <div v-for="exp in t.experience" :key="exp.company" class="mt-4">
                        <div class="flex items-start justify-between mb-2.5">
                            <div>
                                <h4 class="font-semibold text-black">{{ exp.company }}</h4>
                                <h6 class="text-gray-700">{{ exp.position }}</h6>
                            </div>
                            <p class="text-sm font-semibold text-gray-700">{{ exp.period }}</p>
                        </div>
                        <ul class="list-disc list-inside [&>li]:my-1">
                            <li v-for="responsibility in exp.responsibilities" :key="responsibility"
                                class="text-gray-800">
                                {{ responsibility }}
                            </li>
                        </ul>
                    </div>
                </section>

                <!-- Projects -->
                <section>
                    <h3 class="mb-4 pb-2.5 border-b-2 border-black text-xl font-bold text-black">
                        {{ t.sections.projects }}
                    </h3>
                    <div v-for="project in t.projects" :key="project.name" class="mb-6">
                        <div class="flex items-start justify-between mb-2">
                            <div>
                                <h4 class="font-semibold text-black">
                                    <a v-if="project.link" :href="project.link" target="_blank" class="hover:underline">
                                        {{ project.name }}
                                    </a>
                                    <span v-else>
                                        {{ project.name }}
                                    </span>
                                </h4>
                                <p class="text-sm text-gray-600">{{ project.technology }}</p>
                            </div>
                            <p class="text-sm font-semibold text-gray-700">{{ project.period }}</p>
                        </div>
                        <p class="text-gray-800">{{ project.description }}</p>
                    </div>
                </section>

                <!-- Licenses & certifications -->
                <section>
                    <h3 class="mb-4 pb-2.5 border-b-2 border-black text-xl font-bold text-black">
                        {{ t.sections.certifications }}
                    </h3>
                    <div v-for="cert in t.certifications" :key="cert.name" class="mb-4">
                        <div class="flex items-start justify-between mb-1">
                            <h4 class="font-semibold text-black">
                                <a :href="cert.link" target="_blank" class="hover:underline">
                                    {{ cert.name }}
                                </a>
                            </h4>
                            <p class="text-sm text-gray-600">{{ cert.date }}</p>
                        </div>
                        <p class="text-gray-700 text-sm">{{ cert.issuer }}</p>
                        <p v-if="cert.credentialId" class="text-gray-600 text-xs">Credential ID: {{ cert.credentialId }}
                        </p>
                    </div>
                </section>

                <!-- Contact -->
                <section>
                    <h3 class="mb-4 pb-2.5 border-b-2 border-black text-xl font-bold text-black">
                        {{ t.sections.contact }}
                    </h3>
                    <ul>
                        <li v-for="contact in contactInfo" :key="contact.title"
                            class="mt-2.5 text-gray-800 not-first-of-type:mt-2.5">
                            <strong>{{ contact.title }}: </strong>
                            <a :href="contact.link" class="hover:underline print:underline text-black" target="_blank"
                                rel="noopener noreferrer">
                                {{ contact.displayText || contact.link.replace(/^mailto:|^https?:\/\/|^tel:/, '') }}
                            </a>
                        </li>
                    </ul>
                </section>
            </div>
        </main>
    </div>
</template>

<style scoped>
@media print {
    @page {
        size: A4 portrait !important;
        margin: 0.5in 0.4in !important;
    }

    * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
    }

    body {
        font-size: 12pt !important;
        line-height: 1.3 !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
    }

    .print\:hidden {
        display: none !important;
    }

    .print\:text-black {
        color: black !important;
    }

    .print\:underline {
        text-decoration: underline !important;
    }

    /* Ensure proper page breaks */
    section {
        break-inside: avoid;
        page-break-inside: avoid;
    }

    /* Prevent orphaned lines */
    h1,
    h2,
    h3,
    h4 {
        break-after: avoid;
        page-break-after: avoid;
    }

    /* Adjust spacing for print */
    .space-y-8>*+* {
        margin-top: 1rem !important;
    }

    /* Ensure text is readable */
    .text-gray-800 {
        color: #1f2937 !important;
    }

    .text-gray-700 {
        color: #374151 !important;
    }

    .text-gray-600 {
        color: #4b5563 !important;
    }

    /* Force A4 width */
    .max-w-3xl {
        max-width: 7.5in !important;
        width: 7.5in !important;
    }
}

/* Regular styles */
@media screen {
    .max-w-3xl {
        max-width: 48rem;
    }
}
</style>