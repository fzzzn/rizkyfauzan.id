<template>
  <div ref="pageRef" class="h-screen lg:py-6 lg:px-6 flex flex-col transition-all duration-400" :class="{ 'opacity-0 blur-sm': leaving }">
    <div class="flex-1 flex flex-col lg:rounded-xl lg:border lg:border-black/30 lg:overflow-hidden relative">
      <navigation-bar />
      <main class="flex-1 flex items-center justify-center p-6">
        <div class="text-center flex flex-col items-center gap-6">
          <h1 class="glitch text-8xl lg:text-[12rem] font-bold tracking-tighter leading-none"
            :data-text="error?.status">
            {{ error?.status }}
          </h1>
          <p class="text-2xl lg:text-4xl font-bold">
            {{ error?.status === 404 ? 'Page Not Found' : 'Something Went Wrong' }}
          </p>
          <p class="text-lg text-neutral-500 max-w-xl">
            {{ error?.status === 404
              ? 'The page you are looking for does not exist or has been moved.'
              : error?.message || 'An unexpected error occurred.'
            }}
          </p>
          <button class="group text-xl font-bold cursor-pointer" aria-label="Go back to home page"
            @click="handleGoHome">
            <span class="relative">
              Back to Home
              <span
                class="absolute left-0 bottom-0 h-full w-full max-w-0 backdrop-invert transition-all group-hover:max-w-full" />
            </span>
          </button>
        </div>
      </main>
      <web-footer class="hidden lg:block" />
    </div>
    <web-footer class="block lg:hidden" />
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

useSeoMeta({
  title: `${props.error?.status || 404} - Rizky Fauzan Hanif`,
  description: 'The page you are looking for does not exist.',
})

const leaving = ref(false)

const handleGoHome = () => {
  leaving.value = true
  setTimeout(() => {
    clearError({ redirect: '/' })
  }, 400)
}
</script>

<style scoped>
.glitch {
  position: relative;
  animation: glitch-skew 1s infinite linear alternate-reverse;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.glitch::before {
  color: #ff0000;
  z-index: -1;
  animation: glitch-1 0.4s infinite linear alternate-reverse;
}

.glitch::after {
  color: #0000ff;
  z-index: -2;
  animation: glitch-2 0.4s infinite linear alternate-reverse;
}

@keyframes glitch-skew {
  0% { transform: skew(0deg); }
  2% { transform: skew(2deg); }
  4% { transform: skew(-1deg); }
  6% { transform: skew(0deg); }
  20% { transform: skew(0deg); }
  22% { transform: skew(-3deg); }
  24% { transform: skew(1deg); }
  26% { transform: skew(0deg); }
  50% { transform: skew(0deg); }
  52% { transform: skew(4deg); }
  53% { transform: skew(-2deg); }
  55% { transform: skew(0deg); }
  78% { transform: skew(0deg); }
  80% { transform: skew(-1deg); }
  82% { transform: skew(3deg); }
  83% { transform: skew(0deg); }
  100% { transform: skew(0deg); }
}

@keyframes glitch-1 {
  0% { clip-path: inset(40% 0 61% 0); transform: translate(-4px, -2px); }
  4% { clip-path: inset(10% 0 85% 0); transform: translate(4px, 2px); }
  8% { clip-path: inset(80% 0 1% 0); transform: translate(-3px, 3px); }
  12% { clip-path: inset(25% 0 58% 0); transform: translate(3px, -4px); }
  16% { clip-path: inset(56% 0 31% 0); transform: translate(-5px, 2px); }
  20% { clip-path: inset(2% 0 90% 0); transform: translate(5px, -1px); }
  24% { clip-path: inset(70% 0 15% 0); transform: translate(-2px, -3px); }
  28% { clip-path: inset(35% 0 50% 0); transform: translate(2px, 4px); }
  32% { clip-path: inset(92% 0 1% 0); transform: translate(-4px, -4px); }
  36% { clip-path: inset(15% 0 70% 0); transform: translate(4px, 1px); }
  40% { clip-path: inset(45% 0 40% 0); transform: translate(-3px, 3px); }
  44% { clip-path: inset(65% 0 20% 0); transform: translate(3px, -2px); }
  48% { clip-path: inset(5% 0 80% 0); transform: translate(-5px, 2px); }
  52% { clip-path: inset(50% 0 35% 0); transform: translate(5px, -3px); }
  56% { clip-path: inset(20% 0 65% 0); transform: translate(-2px, -1px); }
  60% { clip-path: inset(75% 0 10% 0); transform: translate(2px, 2px); }
  64% { clip-path: inset(30% 0 55% 0); transform: translate(-4px, 4px); }
  68% { clip-path: inset(60% 0 25% 0); transform: translate(4px, -2px); }
  72% { clip-path: inset(8% 0 78% 0); transform: translate(-3px, 1px); }
  76% { clip-path: inset(42% 0 43% 0); transform: translate(3px, -4px); }
  80% { clip-path: inset(88% 0 3% 0); transform: translate(-5px, -2px); }
  84% { clip-path: inset(18% 0 72% 0); transform: translate(5px, 3px); }
  88% { clip-path: inset(52% 0 38% 0); transform: translate(-2px, -3px); }
  92% { clip-path: inset(72% 0 18% 0); transform: translate(2px, 1px); }
  96% { clip-path: inset(3% 0 88% 0); transform: translate(-4px, 4px); }
  100% { clip-path: inset(85% 0 8% 0); transform: translate(4px, -1px); }
}

@keyframes glitch-2 {
  0% { clip-path: inset(85% 0 8% 0); transform: translate(5px, 2px); }
  4% { clip-path: inset(42% 0 43% 0); transform: translate(-5px, -2px); }
  8% { clip-path: inset(8% 0 78% 0); transform: translate(3px, -4px); }
  12% { clip-path: inset(60% 0 25% 0); transform: translate(-3px, 3px); }
  16% { clip-path: inset(30% 0 55% 0); transform: translate(4px, -1px); }
  20% { clip-path: inset(75% 0 10% 0); transform: translate(-4px, 4px); }
  24% { clip-path: inset(20% 0 65% 0); transform: translate(2px, 2px); }
  28% { clip-path: inset(50% 0 35% 0); transform: translate(-2px, -3px); }
  32% { clip-path: inset(5% 0 80% 0); transform: translate(5px, -4px); }
  36% { clip-path: inset(65% 0 20% 0); transform: translate(-5px, 1px); }
  40% { clip-path: inset(45% 0 40% 0); transform: translate(3px, -2px); }
  44% { clip-path: inset(15% 0 70% 0); transform: translate(-3px, 4px); }
  48% { clip-path: inset(92% 0 1% 0); transform: translate(4px, 2px); }
  52% { clip-path: inset(35% 0 50% 0); transform: translate(-4px, -4px); }
  56% { clip-path: inset(70% 0 15% 0); transform: translate(2px, -1px); }
  60% { clip-path: inset(2% 0 90% 0); transform: translate(-2px, 3px); }
  64% { clip-path: inset(56% 0 31% 0); transform: translate(5px, -2px); }
  68% { clip-path: inset(25% 0 58% 0); transform: translate(-5px, 4px); }
  72% { clip-path: inset(80% 0 1% 0); transform: translate(3px, -3px); }
  76% { clip-path: inset(10% 0 85% 0); transform: translate(-3px, 1px); }
  80% { clip-path: inset(48% 0 42% 0); transform: translate(4px, -4px); }
  84% { clip-path: inset(68% 0 22% 0); transform: translate(-4px, 2px); }
  88% { clip-path: inset(12% 0 78% 0); transform: translate(2px, -1px); }
  92% { clip-path: inset(82% 0 8% 0); transform: translate(-2px, 3px); }
  96% { clip-path: inset(38% 0 52% 0); transform: translate(5px, -3px); }
  100% { clip-path: inset(40% 0 61% 0); transform: translate(-5px, 2px); }
}
</style>
