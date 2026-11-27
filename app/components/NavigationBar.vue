<template>
	<header class="sticky top-0 z-10 lg:static lg:z-auto bg-bg">
		<div class="px-6 py-5 border-b border-line shrink-0">
			<div class="flex items-center justify-between w-full max-lg:relative">
				<div class="flex items-center gap-4">
					<div class="p-1 rounded-lg items-center transition-transform duration-300">
						<side-bar />
					</div>
					<NuxtLink to="/" class="hidden lg:flex items-center">
						<span class="text-xl uppercase font-[Inter] font-black tracking-tighter">rizkyfauzan.id</span>
					</NuxtLink>
				</div>

				<!-- Mobile -->
				<NuxtLink to="/" class="flex lg:hidden items-center absolute left-1/2 transform -translate-x-1/2">
					<span class="text-xl uppercase font-[Inter] font-black tracking-tighter">rizkyfauzan.id</span>
				</NuxtLink>

				<!-- Desktop menu: absolutely centered, independent of logo and theme button.
				     Hidden below xl so it never overlaps the logo or theme button. -->
				<nav aria-label="Primary navigation" class="hidden xl:flex items-center gap-4 absolute left-1/2 -translate-x-1/2">
					<NuxtLink
v-for="item in navItems" :key="item.title" :to="item.href" :class="[
						'relative px-2 py-1 uppercase text-sm transition-all duration-200 rounded-md group',
						$route.path === item.href || ($route.path.startsWith(item.href) && item.href !== '/')
							? 'text-inverse-fg bg-inverse-bg'
							: 'hover:text-inverse-fg hover:bg-inverse-bg'
					]">
						<span class="relative z-10 font-bold">{{ item.title }}</span>
					</NuxtLink>
				</nav>

				<div class="flex items-center gap-2">
					<button
						type="button"
						class="hidden sm:inline-flex items-center justify-center gap-1.5 h-8 px-2.5 text-xs font-mono leading-none text-muted hover:text-fg hover:bg-fg/5 border border-border rounded-md transition-colors cursor-pointer"
						aria-label="Open command palette"
						@click="openCommandPalette">
						<Icon name="heroicons:magnifying-glass" size="14" class="shrink-0" aria-hidden="true" />
						<span>⌘K</span>
					</button>
					<button
						type="button"
						class="inline-flex items-center justify-center h-8 w-8 text-muted hover:text-fg hover:bg-fg/5 border border-border rounded-md transition-colors cursor-pointer"
						:aria-label="`Color mode: ${mode}. Click to change.`"
						@click="cycle">
						<Icon :name="icon" size="18" aria-hidden="true" />
					</button>
				</div>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
const navItems = [
	{
		title: "Home",
		href: "/",
	},
	{
		title: "About",
		href: "/about",
	},
	{
		title: "Projects",
		href: "/projects",
	},
	{
		title: "Achievements",
		href: "/achievements",
	},
	{
		title: "Certificates",
		href: "/certificates",
	},
	{
		title: "Contact",
		href: "/contact",
	},
	{
		title: "Guestbook",
		href: "/guestbook",
	},
	{
		title: "Resume",
		href: "/resume",
	},
]

const { mode, cycle, init } = useColorMode()
const commandPaletteOpen = useState<boolean>('command-palette-open', () => false)
const openCommandPalette = () => {
	commandPaletteOpen.value = true
}

onMounted(init)

const icon = computed(() => {
	if (mode.value === 'light') return 'heroicons:sun'
	if (mode.value === 'dark') return 'heroicons:moon'
	return 'heroicons:computer-desktop'
})
</script>
