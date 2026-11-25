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
				<div class="hidden xl:flex items-center gap-4 absolute left-1/2 -translate-x-1/2">
					<NuxtLink v-for="item in navItems" :key="item.title" :to="item.href" :class="[
						'relative px-2 py-1 uppercase text-sm transition-all duration-200 rounded-md group',
						$route.path === item.href || ($route.path.startsWith(item.href) && item.href !== '/')
							? 'text-inverse-fg bg-inverse-bg'
							: 'hover:text-inverse-fg hover:bg-inverse-bg'
					]">
						<span class="relative z-10 font-bold">{{ item.title }}</span>
					</NuxtLink>
				</div>

				<button class="cursor-pointer text-muted hover:text-fg transition-colors"
					:aria-label="`Color mode: ${mode}. Click to change.`" @click="cycle">
					<Icon :name="icon" size="22" />
				</button>
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

onMounted(init)

const icon = computed(() => {
	if (mode.value === 'light') return 'heroicons:sun'
	if (mode.value === 'dark') return 'heroicons:moon'
	return 'heroicons:computer-desktop'
})
</script>
