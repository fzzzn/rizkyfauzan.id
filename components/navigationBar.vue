<template>
	<header class="sticky top-0 z-10 lg:static lg:z-auto bg-white">
		<div class="px-6 py-5 border-b border-black/30 flex-shrink-0">
			<div class="flex items-center justify-between w-full">
				<div class="flex items-center gap-4">
					<div class="p-1 rounded-lg items-center transition-transform duration-300">
						<side-bar />
					</div>
					<NuxtLink to="/" class="hidden lg:flex items-center">
						<h1 class="text-xl uppercase font-black">rizkyfauzan.id</h1>
					</NuxtLink>
				</div>

				<!-- Mobile centered title -->
				<NuxtLink to="/" class="flex lg:hidden items-center absolute left-1/2 transform -translate-x-1/2">
					<h1 class="text-xl uppercase font-black">rizkyfauzan.id</h1>
				</NuxtLink>

				<div class="hidden lg:flex items-center gap-4">
					<NuxtLink v-for="item in navItems" :key="item.title" :to="item.href"
						class="relative px-2 uppercase text-sm text-black/60 hover:text-black transition-colors duration-200 rounded-md group">
						<span class="relative z-10 font-bold">{{ item.title }}</span>
					</NuxtLink>
				</div>
			</div>
		</div>
	</header>
</template>

<script setup>
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
		title: "Resume",
		href: "/resume",
	},
]
</script>

