<template>
	<div class="flex items-center justify-between w-full">
		<!-- Left side - Sidebar (visible on all screens) -->
		<div class="flex items-center">
			<div class="p-1 rounded-lg items-center transition-transform duration-300">
				<side-bar />
			</div>
		</div>

		<!-- Center - Title (always centered) -->
		<div class="absolute left-1/2 transform -translate-x-1/2">
			<NuxtLink to="/" class="flex items-center">
				<h1 class="text-md uppercase font-bold">rizkyfauzan.id</h1>
			</NuxtLink>
		</div>

		<!-- Right side - Navigation (hidden on mobile) -->
		<div class="hidden md:flex items-center gap-4">
			<NuxtLink v-for="item in navItems" :key="item.title" :to="item.href"
				class="relative px-2 uppercase text-sm text-black/60 hover:text-black transition-colors duration-200 rounded-md group">
				<span class="relative z-10 font-bold">{{ item.title }}</span>
			</NuxtLink>
		</div>

		<!-- Right side spacer for mobile to maintain balance -->
		<div class="md:hidden w-8"></div>
	</div>
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
]
</script>
