<template>
    <footer class="px-6 py-4 relative z-50">
        <div class="text-neutral-500 flex flex-col gap-4">
            <!-- Main footer content -->
            <div class="relative flex flex-col lg:flex-row gap-2.5 items-center">
                <!-- Navigation links -->
                <nav class="flex items-center gap-3">
                    <NuxtLink
v-for="item in menuItems" :key="item.menu" :to="item.href"
                        :target="item.external ? '_blank' : undefined"
                        :rel="item.external ? 'noopener noreferrer' : undefined"
                        :external="item.external"
                        :class="['uppercase font-bold text-sm transition-colors duration-200', sidebarOpen ? 'hover:text-white' : 'hover:text-fg']">
                        {{ item.menu }}
                    </NuxtLink>
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
    external?: boolean
}

const menuItems: MenuItem[] = [
    {
        menu: "Credits",
        href: "/credits",
    },
    {
        menu: "Resume",
        href: "/resume",
    },
    {
        menu: "Notes",
        href: "https://notes.rizkyfauzan.id",
        external: true,
    },
]

const { sidebarOpen } = useSidebarState()

// useState keeps the quote picked once per app load and shared across the two
// footer instances, so navigating between pages (and layouts) does not re-roll
// it like a reload.
const currentQuote = useState<string>('footer-quote', () => getRandomQuote())
</script>