<template>
    <footer class="px-6 py-4 relative z-50">
        <div class="text-neutral-500 flex flex-col gap-4">
            <!-- Main footer content -->
            <div class="relative flex flex-col lg:flex-row gap-2.5 items-center">
                <!-- Navigation links -->
                <nav class="flex items-center gap-3">
                    <a v-for="item in menuItems" :key="item.menu" target="_blank" rel="noopener" :href="item.href"
                        :class="['uppercase font-bold text-sm transition-colors duration-200', sidebarOpen ? 'hover:text-white' : 'hover:text-black']">
                        {{ item.menu }}
                    </a>
                </nav>

                <!-- Quote -->
                <p class="text-sm italic text-center lg:absolute lg:left-1/2 lg:-translate-x-1/2">
                    "{{ currentQuote }}"
                </p>

                <!-- Copyright -->
                <p class="text-sm font-bold lg:ml-auto">
                    &copy;{{ new Date().getFullYear() }}
                </p>
            </div>

            <!-- Source Code -->
            <!-- <div class="flex justify-center">
                <a
href="https://github.com/fzzzn/rizkyfauzan.id" target="_blank" rel="noopener noreferrer"
                    class="text-xs hover:text-black transition-colors duration-200 flex items-center gap-1.5">
                    <Icon name="mdi:github" size="14" />
                    <span>Source Code</span>
                </a>
            </div> -->
        </div>
    </footer>
</template>

<script setup lang="ts">
interface MenuItem {
    menu: string
    href: string
}

const menuItems: MenuItem[] = [
    {
        menu: "Resume",
        href: "resume",
    },
    {
        menu: "Notes",
        href: "https://notes.rizkyfauzan.id",
    },
]

const { sidebarOpen } = useSidebarState()

const currentQuote = ref<string>('')

onMounted(async () => {
    // Fetch commit data and quote in parallel
    const [quote] = await Promise.all([
        Promise.resolve(getRandomQuote())
    ])
    currentQuote.value = quote
})
</script>