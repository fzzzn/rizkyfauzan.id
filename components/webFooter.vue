<template>
    <footer class="p-4 border-t border-black/30">
        <div class="text-black/60 flex flex-col gap-2.5">
            <!-- Main footer content -->
            <div class="flex flex-col sm:flex-row gap-2.5 items-center justify-between">
                <!-- Navigation links -->
                <nav class="flex items-center gap-3">
                    <a
                        v-for="item in menuItems" :key="item.menu" target="_blank" rel="noopener" :href="item.href"
                        class="uppercase font-bold text-sm hover:text-black transition-colors duration-200">
                        {{ item.menu }}
                    </a>
                </nav>

                <!-- Quote -->
                <p class="mb-0 text-xs italic text-center sm:text-right">
                    "{{ currentQuote }}"
                </p>
            </div>

            <div class="flex justify-center sm:justify-end">
                <!-- Source code link -->
                <a 
                    href="https://github.com/fzzzn/rizkyfauzan.id" 
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-xs hover:text-black transition-colors duration-200 flex items-center gap-1.5"
                >
                    <Icon name="mdi:github" size="14" />
                    <span>Source Code</span>
                </a>
                
                <!-- <a 
                    v-if="commitData" 
                    :href="getCommitUrl('fzzzn/rizkyfauzan.id', commitData.sha)" 
                    target="_blank"
                    class="text-xs hover:text-black transition-colors duration-200"
                >
                    Last updated: {{ formatCommitDate(commitData.date) }}
                </a> -->
            </div>
        </div>
    </footer>
</template>

<script lang="ts" setup>
interface MenuItem {
    menu: string
    href: string
}

const menuItems: MenuItem[] = [
    {
        menu: "Github",
        href: "https://github.com/fzzzn",
    },
    {
        menu: "Resume",
        href: "https://rizkyfauzan.id/resume",
    },
    {
        menu: "Notes",
        href: "https://notes.rizkyfauzan.id",
    },
    { menu: "Status", href: "https://status.rizkyfauzan.id" },
    {
        menu: "NMS",
        href: "https://nms.rizkyfauzan.id/",
    },
]

const commitData = ref<{ date: string; sha: string } | null>(null)
const currentQuote = ref<string>('')

onMounted(async () => {
    // Fetch commit data and quote in parallel
    const [commit, quote] = await Promise.all([
        fetchLatestCommit(),
        Promise.resolve(getRandomQuote())
    ])

    commitData.value = commit
    currentQuote.value = quote
})
</script>