<script setup>
definePageMeta({
    layout: 'blank',
})

useSeoMeta({
    title: 'Resume',
    description: 'Resume of Rizky Fauzan Hanif',
})

const personalInfo = {
    name: 'Rizky Fauzan Hanif',
}

const contactInfo = [
    {
        title: 'E-mail',
        link: 'mailto:contact@rizkyfauzan.id'
    },
    {
        title: 'Website',
        link: 'https://rizkyfauzan.id'
    },
    {
        title: 'LinkedIn',
        link: 'https://linkedin.com/in/rizky-fauzan-hanif'
    },
]

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
    {
        title: 'Certificates',
        link: 'https://rizkyfauzan.id/certificates'
    }
]

const aboutMe = 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

const skills = [
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui deserunt mollit anim id est laborum.',
]

const keyAbilities = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui deserunt mollit anim id est laborum.',
]

const education = [
    {
        institution: 'SMKN 2 Depok Sleman',
        period: '2023 - 2027',
        program: 'Sistem Informasi Jaringan dan Aplikasi',
        achievements: [
            'Juara 1 Olimpade Jaringan MikroTik 2024',
            'Juara 3 LKS IT Network System Administration (ITNSA) Provinsi DIY Tahun 2024'
        ]
    },
    {
        institution: 'SMP Negeri 2 Ngaglik',
        period: '2020 - 2023',
    }
]

const experience = [
    {
        company: 'SMK Negeri 2 Depok Sleman',
        position: 'Network Operations Center (Volunteer)',
        period: 'Agustus 2024 - Sekarang',
        responsibilities: [
            'Melakukan monitoring dan maintenance infrastruktur jaringan',
            'Troubleshooting masalah konektivitas dan performa jaringan',
            'Konfigurasi perangkat MikroTik dan perangkat jaringan lainnya',
            'Dokumentasi konfigurasi dan prosedur maintenance'
        ]
    },
]

const certifications = [
    {
        name: 'MikroTik Certified Network Associate (MTCNA)',
        link: "https://ik.imagekit.io/fauzan/certificates/Sertifikat%20MTCNA.png"
    },
    {
        name: 'MikroTik Certified Traffic Control Engineer (MTCTCE)',
        link: "https://ik.imagekit.io/fauzan/certificates/Sertifikat%20MTCTCE.png"
    },
    {
        name: 'Hurricane Electric IPv6 Sage',
        link: "https://ik.imagekit.io/fauzan/certificates/ipv6-certificate.png"
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
                    {{ personalInfo.name }}
                </h1>
                <div class="space-x-4 text-center mt-1.5">
                    <a
v-for="navLink in navigationLinks" :key="navLink.title" :href="navLink.link"
                        :target="navLink.title !== 'Email' ? '_blank' : undefined"
                        :rel="navLink.title !== 'Email' ? 'noopener noreferrer' : undefined"
                        class="relative inline-flex items-center print:underline hover:underline text-black font-semibold hover:after:w-full print:text-black">
                        {{ navLink.title }}
                    </a>
                </div>
            </section>

            <div class="space-y-8">
                <!-- About Me-->
                <section>
                    <div class="flex items-center justify-between pb-2.5 border-b-2 border-black">
                        <h3 class="text-xl font-bold text-black">Tentang Saya</h3>
                        <button
class="inline-flex items-center justify-center cursor-pointer print:hidden"
                            @click="printResume">
                            <Icon name="heroicons:printer" class="text-black animate-pulse text-lg" />
                        </button>
                    </div>
                    <p class="text-gray-800 mt-4">{{ aboutMe }}</p>
                </section>

                <!-- Skills -->
                <section>
                    <h3 class="mb-4 pb-2.5 border-b-2 border-black text-xl font-bold text-black">
                        Keterampilan
                    </h3>
                    <ul class="list-disc list-inside [&>li]:my-1">
                        <li v-for="skill in skills" :key="skill" class="text-gray-800">
                            {{ skill }}
                        </li>
                    </ul>
                </section>

                <!-- Key Abilities -->
                <section>
                    <h3 class="mb-4 pb-2.5 border-b-2 border-black text-xl font-bold text-black">
                        Kunci Kemampuan
                    </h3>
                    <ul class="list-disc list-inside [&>li]:my-1">
                        <li v-for="ability in keyAbilities" :key="ability" class="text-gray-800">
                            {{ ability }}
                        </li>
                    </ul>
                </section>

                <!-- Education -->
                <section>
                    <h3 class="pb-2.5 border-b-2 border-black text-xl font-bold text-black">
                        Pendidikan
                    </h3>
                    <div v-for="edu in education" :key="edu.institution" class="mt-4">
                        <div class="flex items-start justify-between mb-2.5">
                            <h4 class="max-w-md font-semibold text-black">{{ edu.institution }}</h4>
                            <p class="text-sm font-semibold text-gray-700">{{ edu.period }}</p>
                        </div>
                        <p class="text-gray-800 mb-2">{{ edu.program }}</p>
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
                        <h3 class="text-xl font-bold text-black">Pengalaman</h3>
                    </div>
                    <div v-for="exp in experience" :key="exp.company" class="mt-4">
                        <div class="flex items-start justify-between mb-2.5">
                            <div>
                                <h4 class="font-semibold text-black">{{ exp.company }}</h4>
                                <h6 class="text-gray-700">{{ exp.position }}</h6>
                            </div>
                            <p class="text-sm font-semibold text-gray-700">{{ exp.period }}</p>
                        </div>
                        <ul class="list-disc list-inside [&>li]:my-1">
                            <li
v-for="responsibility in exp.responsibilities" :key="responsibility"
                                class="text-gray-800">
                                {{ responsibility }}
                            </li>
                        </ul>
                    </div>
                </section>

                <!-- Certifications -->
                <section>
                    <h3 class="mb-4 pb-2.5 border-b-2 border-black text-xl font-bold text-black">
                        Sertifikasi dan Penghargaan
                    </h3>
                    <div v-for="cert in certifications" :key="cert.name" class="mb-2">
                        <p class="text-gray-800 [&:not(:first-of-type)]:mt-1">
                            <a :href="cert.link" target="_blank" class="font-bold text-black hover:underline">
                                <span class="font-bold text-black">
                                    {{ cert.name }}
                                </span></a>
                            <br>
                            <span v-if="cert.date">Diterbitkan {{ cert.date }}</span><span v-if="cert.expiry">,
                                kadaluarsa {{ cert.expiry }}. </span>
                        </p>
                    </div>
                </section>

                <!-- Contact -->
                <section>
                    <h3 class="mb-4 pb-2.5 border-b-2 border-black text-xl font-bold text-black">
                        Kontak Saya
                    </h3>
                    <ul>
                        <li
v-for="contact in contactInfo" :key="contact.title"
                            class="mt-2.5 text-gray-800 [&:not(:first-of-type)]:mt-2.5">
                            <strong>{{ contact.title }}: </strong>
                            <a
:href="contact.link" class="hover:underline print:underline text-black" target="_blank"
                                rel="noopener noreferrer">
                                {{ contact.link.replace(/^mailto:|^https?:\/\//, '') }}
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
        margin: 0.3in;
        size: A4;
    }

    body {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
    }

    .print\:hidden {
        display: none !important;
    }
}
</style>