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
    title: 'Network Engineer',
    location: 'Sleman, Yogyakarta, Indonesia',
}   

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

const professionalSummary = [
    "I'm Rizky Fauzan Hanif, a passionate Network Engineer with interests in Cloud Engineering and Cybersecurity, based in Sleman, Special Region of Yogyakarta. Currently, I am a student at SMK Negeri 2 Depok Sleman. I enjoy exploring and learning new technologies such as Kubernetes, Docker, virtualization, BGP, VPNs, firewalls, traffic control, IPv6, and network security.",
    "To deepen my knowledge, I have earned MikroTik Certified Network Associate (MTCNA), MikroTik Certified Traffic Control Engineer (MTCTCE), and IPv6 Sage by Hurricane Electric, as well as additional certifications in programming, cybersecurity, and cloud computing.",
    "I care about infrastructure that is reliable, maintainable, and scalable."
]

const skills = [
    'MikroTik RouterOS - Routing, firewall, and traffic control configuration',
    'Network Monitoring - SNMP, bandwidth monitoring, and performance analysis',
    'IPv6 Implementation - Dual-stack configuration and IPv6 transition technologies',
    'Network Security - Firewall rules, VPN configuration, and access control',
    'Linux Administration - Network services configuration and system administration'
]

const projects = [
    {
        name: 'Personal Website & Portfolio',
        technology: 'Nuxt 3, TypeScript, Tailwind CSS, Supabase',
        period: '2025 ',
        description: 'Personal portfolio website with guestbook, multi-provider authentication, and responsive design',
        link: 'https://rizkyfauzan.id'
    },
    {
        name: 'School Network Infrastructure',
        technology: 'MikroTik RouterOS, VLAN, QoS',
        period: '2024 - 2025',
        description: 'Implementation and maintenance of school network infrastructure with VLAN configuration, QoS, and monitoring'
    }
]

const keyAbilities = [
    'Systematic network problem analysis and resolution',
    'Effective teamwork and communication skills',
    'Quick adaptation to latest networking technologies',
    'Time management and prioritization in dynamic work environments',
    'Self-directed learning and continuous skill development'
]

const education = [
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
]

const experience = [
    {
        company: 'SMK Negeri 2 Depok Sleman',
        position: 'Network Operations Center (Volunteer)',
        period: 'August 2024 - Present',
        responsibilities: [
            'Monitoring and maintaining network infrastructure',
            'Troubleshooting connectivity and network performance issues',
            'Configuring MikroTik and other network devices',
            'Documenting configurations and maintenance procedures'
        ]
    },
]

const certifications = [
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
                <h2 class="text-center text-lg text-gray-700 mt-1">
                    {{ personalInfo.title }}
                </h2>
                <p class="text-center text-sm text-gray-600 mt-1">
                    {{ personalInfo.location }}
                </p>
                <div class="space-x-4 text-center mt-3">
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
                <!-- Professional Summary -->
                <section>
                    <div class="flex items-center justify-between pb-2.5 border-b-2 border-black">
                        <h3 class="text-xl font-bold text-black">Professional Summary</h3>
                        <button
                            class="inline-flex items-center justify-center cursor-pointer print:hidden"
                            @click="printResume">
                            <Icon name="heroicons:printer" class="text-black animate-pulse text-lg" />
                        </button>
                    </div>
                    <div class="mt-4">
                        <p v-for="(paragraph, idx) in professionalSummary" :key="idx" class="text-gray-800 mb-2">{{ paragraph }}</p>
                    </div>
                </section>

                <!-- Technical Skills -->
                <section>
                    <h3 class="mb-4 pb-2.5 border-b-2 border-black text-xl font-bold text-black">
                        Technical Skills
                    </h3>
                    <ul class="list-disc list-inside [&>li]:my-1">
                        <li v-for="skill in skills" :key="skill" class="text-gray-800">
                            {{ skill }}
                        </li>
                    </ul>
                </section>

                <!-- Projects -->
                <section>
                    <h3 class="mb-4 pb-2.5 border-b-2 border-black text-xl font-bold text-black">
                        Projects
                    </h3>
                    <div v-for="project in projects" :key="project.name" class="mb-6">
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

                <!-- Soft Skills -->
                <section>
                    <h3 class="mb-4 pb-2.5 border-b-2 border-black text-xl font-bold text-black">
                        Soft Skills
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
                        Education
                    </h3>
                    <div v-for="edu in education" :key="edu.institution" class="mt-4">
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
                        <h3 class="text-xl font-bold text-black">Experience</h3>
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
                        Certificates
                    </h3>
                    <div v-for="cert in certifications" :key="cert.name" class="mb-4">
                        <div class="flex items-start justify-between mb-1">
                            <h4 class="font-semibold text-black">
                                <a :href="cert.link" target="_blank" class="hover:underline">
                                    {{ cert.name }}
                                </a>
                            </h4>
                            <p class="text-sm text-gray-600">{{ cert.date }}</p>
                        </div>
                        <p class="text-gray-700 text-sm">{{ cert.issuer }}</p>
                        <p v-if="cert.credentialId" class="text-gray-600 text-xs">Credential ID: {{ cert.credentialId }}</p>
                    </div>
                </section>

                <!-- Contact -->
                <section>
                    <h3 class="mb-4 pb-2.5 border-b-2 border-black text-xl font-bold text-black">
                        Contact
                    </h3>
                    <ul>
                        <li
                            v-for="contact in contactInfo" :key="contact.title"
                            class="mt-2.5 text-gray-800 [&:not(:first-of-type)]:mt-2.5">
                            <strong>{{ contact.title }}: </strong>
                            <a
                                :href="contact.link" class="hover:underline print:underline text-black" target="_blank"
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
    h1, h2, h3, h4 {
        break-after: avoid;
        page-break-after: avoid;
    }

    /* Adjust spacing for print */
    .space-y-8 > * + * {
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