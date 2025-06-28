<template>
    <footer class="p-4 border-t border-border">
        <div class="text-black/60 font-bold text-sm flex sm:flex-row gap-4 flex-col items-center justify-between">
            
            <div class="flex items-center gap-3">
                <a v-for="item in menuItems" :key="item.menu" :href="item.href"
                    class="uppercase hover:text-black transition-colors duration-200"
                >{{ item.menu }}</a>
            </div>
            <div class="flex items-center gap-4 mb-0">
                <span>@{{ new Date().getFullYear() }}</span>
            </div>
        </div>
    </footer>
</template>

<script setup>
const menuItems = [
    {
        menu: "Email",
        href: "mailto:contact@rizkyfauzan.id",
    },
    {
        menu: "github",
        href: "https://github.com/fzzzn",
    },
    {
        menu: "linkedin",
        href: "https://www.linkedin.com/in/rizky-fauzan-hanif",
    },
    {
        menu: "notes",
        href: "https://notes.rizkyfauzan.id",
    }
];
</script>