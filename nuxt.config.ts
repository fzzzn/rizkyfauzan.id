// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  pages: true,
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "utf-8" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/logo.png" },
      ],
    },
  },
  site: {
    url: "https://rizkyfauzan.id",
    name: "Rizky Fauzan Hanif",
    description: "Personal website of Rizky Fauzan Hanif.",
    twitter: "@fzzznh",
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxtjs/seo",
  ],
});
