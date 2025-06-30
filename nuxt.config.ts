// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import { definePerson } from "nuxt-schema-org/schema";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  pages: true,
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  supabase: {
    redirectOptions: {
      login: "/guestbook",
      callback: "/auth/callback",
      exclude: ["*"],
    },
  },
  fonts: {
    families: [
      { name: "Antonio", provider: "google", global: true },
      { name: "Inter", provider: "google", global: true },
      { name: "JetBrains Mono", provider: "google", global: true },
      { name: "Geist", provider: "google", global: true },
    ],
  },
  nitro: {
    prerender: {
      autoSubfolderIndex: false,
    },
  },
  app: {
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "utf-8" },
      ],
      link: [{ rel: "icon", type: "image/png", href: "/logo.png" }],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  site: {
    url: "https://rizkyfauzan.id",
    name: "Fauzan's Personal Website",
  },
  seo: {
    meta: {
      twitterCreator: "@fzzznh",
      author: "Rizky Fauzan Hanif",
      applicationName: "Fauzan's Personal Website",
      ogSiteName: "Fauzan's Personal Website",
      ogLocale: "en_US",
      ogType: "website",
      ogUrl: "https://rizkyfauzan.id",
      ogTitle: "Fauzan's Personal Website",
      robots: "index, follow",
    },
  },
  schemaOrg: {
    identity: definePerson({
      name: "Rizky Fauzan Hanif",
      givenName: "Fauzan",
      image: "/logo.png",
      description: "Network Engineer.",
      jobTitle: "Network Engineer",
      email: "contact@rizkyfauzan.id",
      url: "https://rizkyfauzan.id",
      sameAs: [
        "https://x.com/fzzznh",
        "https://github.com/fzzzn",
        "https://linkedin.com/in/rizky-fauzan-hanif",
        "https://instagram.com/fauzannnnh",
      ],
    }),
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxtjs/seo",
    "@nuxtjs/supabase",
  ],
});
