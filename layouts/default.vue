<template>
    <div class="h-screen py-4 px-2 md:py-6 md:px-4 lg:py-6 lg:px-6 flex flex-col">
        <div class="flex-1 border rounded-xl border-border flex flex-col overflow-hidden relative">
            <header class="px-6 py-4 bg-background border-b border-border flex-shrink-0">
               <navigation-bar />
            </header>
            <main class="flex-1 overflow-hidden relative">
                <div class="h-full overflow-y-auto scrollable-content relative">
                    <slot />
                </div>
            </main>
            <web-footer />
        </div>
    </div>
</template>
