<template>
    <div
        class="max-w-3xl w-11/12 mx-auto transition-opacity duration-200"
        :class="{ 'opacity-0': !isReady, 'opacity-100': isReady }">
        <main class="py-4 print:text-black">
            <!-- Top action bar -->
            <div class="print:hidden flex items-center justify-between mb-4">
                <NuxtLink
                    to="/"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium text-black"
                    aria-label="Back to home">
                    <Icon name="heroicons:arrow-left" class="text-black text-base" />
                    Home
                </NuxtLink>
                <div class="flex items-center gap-2">
                    <button
                        type="button"
                        class="inline-flex items-center justify-center cursor-pointer px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                        :aria-label="currentLang === 'en' ? 'Switch resume language to Indonesian' : 'Switch resume language to English'"
                        @click="toggleLanguage">
                        <span class="text-sm font-medium text-black">{{ currentLang === 'en' ? 'ID' : 'EN' }}</span>
                    </button>
                    <button
                        type="button"
                        class="inline-flex items-center justify-center cursor-pointer px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                        aria-label="Print resume"
                        @click="printResume">
                        <Icon name="heroicons:printer" class="text-black text-lg" />
                    </button>
                </div>
            </div>

            <!-- Header Section -->
            <section class="w-full mt-2 mb-4">
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
                    <a
                        v-for="navLink in navigationLinks"
                        :key="navLink.title"
                        :href="navLink.link"
                        :target="navLink.title !== 'Email' ? '_blank' : undefined"
                        :rel="navLink.title !== 'Email' ? 'noopener noreferrer' : undefined"
                        class="relative inline-flex items-center print:underline hover:underline text-black font-semibold hover:after:w-full print:text-black">
                        {{ navLink.title }}
                    </a>
                </div>
            </section>

            <div class="space-y-8">
                <!-- About Me -->
                <section>
                    <h3 class="mb-4 pb-2.5 border-b-2 border-black text-xl font-bold text-black">
                        {{ t.sections.aboutMe }}
                    </h3>
                    <div class="mt-4">
                        <p v-for="(paragraph, idx) in t.aboutMe" :key="idx" class="text-gray-800 mb-2 text-justify">
                            {{ paragraph }}
                        </p>
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
                            <p class="text-sm text-right font-semibold text-gray-700 min-w-fit">{{ edu.period }}</p>
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
                    <h3 class="mb-4 pb-2.5 border-b-2 border-black text-xl font-bold text-black">
                        {{ t.sections.experience }}
                    </h3>
                    <div v-for="exp in t.experience" :key="exp.company" class="mt-4">
                        <div class="flex items-start justify-between mb-2.5">
                            <div>
                                <h4 class="font-semibold text-black">{{ exp.company }}</h4>
                                <p class="text-gray-700">{{ exp.position }}</p>
                            </div>
                            <p class="text-sm text-right font-semibold text-gray-700 min-w-fit">{{ exp.period }}</p>
                        </div>
                        <ul class="list-disc list-inside [&>li]:my-1">
                            <li
                                v-for="responsibility in exp.responsibilities"
                                :key="responsibility"
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
                                    <a v-if="project.link" :href="project.link" target="_blank" rel="noopener noreferrer" class="hover:underline">
                                        {{ project.name }}
                                    </a>
                                    <span v-else>
                                        {{ project.name }}
                                    </span>
                                </h4>
                                <p class="text-sm text-gray-600">{{ project.technology }}</p>
                            </div>
                            <p class="text-sm text-right font-semibold text-gray-700 min-w-fit">{{ project.period }}</p>
                        </div>
                        <p class="text-gray-800 text-justify">{{ project.description }}</p>
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
                                <a :href="cert.link" target="_blank" rel="noopener noreferrer" class="print:underline hover:underline">
                                    {{ cert.name }}
                                </a>
                            </h4>
                            <p class="text-sm text-gray-600 min-w-fit">{{ cert.date }}</p>
                        </div>
                        <p class="text-gray-700 text-sm">{{ cert.issuer }}</p>
                        <p v-if="cert.credentialId" class="text-gray-600 text-xs">
                            Credential ID: {{ cert.credentialId }}
                        </p>
                    </div>
                </section>

                <!-- Contact -->
                <section>
                    <h3 class="mb-4 pb-2.5 border-b-2 border-black text-xl font-bold text-black">
                        {{ t.sections.contact }}
                    </h3>
                    <ul>
                        <li
                            v-for="contact in contactInfo"
                            :key="contact.title"
                            class="mt-2.5 text-gray-800 not-first-of-type:mt-2.5">
                            <strong>{{ contact.title }}: </strong>
                            <a
                                :href="contact.link"
                                class="hover:underline print:underline text-black"
                                target="_blank"
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

<script setup lang="ts">
import { ref, computed, onMounted, type Ref, type ComputedRef } from 'vue'
import {
    resumeTranslations,
    resumeNavigationLinks,
    resumeContactInfo,
    type Language,
    type Translation,
} from '~/data/resume'

definePageMeta({
    layout: 'blank',
})

useSeoMeta({
    title: 'Resume — Network Engineer',
    description: 'Professional resume of Rizky Fauzan Hanif — Network Engineer with MTCNA and MTCTCE certifications, MikroTik, networking, cloud, and cybersecurity experience.',
    ogTitle: 'Resume — Rizky Fauzan Hanif, Network Engineer',
    ogDescription: 'Professional resume of Rizky Fauzan Hanif — Network Engineer with MTCNA and MTCTCE certifications.',
})

usePageOgImage('resume', 'Resume — Rizky Fauzan Hanif, Network Engineer')

const route = useRoute()
const router = useRouter()

// Initialize language from query param (works on SSR too), defaulting to 'en'
// to match English SEO metadata and html lang="en".
const getInitialLang = (): Language => {
    const queryLang = route.query.lang
    if (queryLang === 'en' || queryLang === 'id') {
        return queryLang
    }
    return 'en'
}

const currentLang: Ref<Language> = ref(getInitialLang())
const isReady: Ref<boolean> = ref(false)

useHead({
    htmlAttrs: {
        lang: currentLang,
    },
})

onMounted(() => {
    const queryLang = route.query.lang
    if (queryLang === 'en' || queryLang === 'id') {
        localStorage.setItem('resume-language', queryLang)
    } else {
        const savedLang = localStorage.getItem('resume-language')
        if (savedLang === 'en' || savedLang === 'id') {
            currentLang.value = savedLang
        }
    }
    setTimeout(() => {
        isReady.value = true
    }, 0)
})

const toggleLanguage = (): void => {
    currentLang.value = currentLang.value === 'en' ? 'id' : 'en'
    localStorage.setItem('resume-language', currentLang.value)
    router.replace({ query: { ...route.query, lang: currentLang.value } })
}

const t: ComputedRef<Translation> = computed(() => resumeTranslations[currentLang.value])
const navigationLinks = resumeNavigationLinks
const contactInfo = resumeContactInfo

const printResume = (): void => {
    window.print()
}
</script>

<style scoped>
@media print {
    @page {
        size: A4 portrait !important;
        margin: 0.4in 0.5in !important;
    }

    * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
    }

    body {
        font-size: 10.5pt !important;
        line-height: 1.25 !important;
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

    section {
        break-inside: avoid;
        page-break-inside: avoid;
        margin-bottom: 1.25rem !important;
    }

    h1,
    h2,
    h3,
    h4 {
        break-after: avoid;
        page-break-after: avoid;
    }

    .space-y-4>*+* {
        margin-top: 0.5rem !important;
    }

    h1 {
        font-size: 20pt !important;
        margin-bottom: 0.3rem !important;
    }

    h2 {
        font-size: 12pt !important;
        margin-top: 0.2rem !important;
    }

    h3 {
        font-size: 13pt !important;
        margin-bottom: 0.5rem !important;
        padding-bottom: 0.25rem !important;
    }

    h4 {
        font-size: 11pt !important;
    }

    ul {
        margin-top: 0.25rem !important;
        margin-bottom: 0.25rem !important;
    }

    li {
        margin-top: 0.2rem !important;
        margin-bottom: 0.2rem !important;
        font-size: 10.5pt !important;
    }

    p {
        margin-bottom: 0.3rem !important;
        font-size: 10.5pt !important;
    }

    .mb-6 {
        margin-bottom: 0.75rem !important;
    }

    .mb-4 {
        margin-bottom: 0.5rem !important;
    }

    .mb-2 {
        margin-bottom: 0.25rem !important;
    }

    .mt-4 {
        margin-top: 0.5rem !important;
    }

    .mt-3 {
        margin-top: 0.4rem !important;
    }

    a {
        font-size: 10.5pt !important;
    }

    .text-sm {
        font-size: 9.5pt !important;
    }

    .text-xs {
        font-size: 8.5pt !important;
    }

    .text-gray-800 {
        color: #1f2937 !important;
        font-size: 10.5pt !important;
    }

    .text-gray-700 {
        color: #374151 !important;
    }

    .text-gray-600 {
        color: #4b5563 !important;
    }

    .max-w-3xl {
        max-width: 7.5in !important;
        width: 7.5in !important;
    }
}

@media screen {
    .max-w-3xl {
        max-width: 48rem;
    }
}
</style>
