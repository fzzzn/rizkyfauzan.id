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
  umami: {
    id: "4819c176-2490-4516-88a2-ecbf77ff2ea2",
    host: "https://u.zxn.my.id",
    autoTrack: true,
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
    preset: "cloudflare_pages",
    output: {
      dir: "dist",
      serverDir: "dist/_worker.js",
      publicDir: "dist",
    },
    cloudflare: {
      pages: {
        routes: {
          include: ["/*"],
          exclude: ["/static/*", "/_nuxt/*"],
        },
      },
    },
    prerender: {
      autoSubfolderIndex: false,
      routes: ["/sitemap.xml"],
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
    name: "Rizky Fauzan Hanif",
  },
  seo: {
    meta: {
      twitterCreator: "@fzzznh",
      author: "Rizky Fauzan Hanif",
      applicationName: "Rizky Fauzan Hanif",
      ogSiteName: "Rizky Fauzan Hanif",
      ogLocale: "en_US",
      ogType: "website",
      ogUrl: "https://rizkyfauzan.id",
      ogTitle: "Rizky Fauzan Hanif",
      ogDescription:
        "Network Engineer and student at SMKN 2 Depok Sleman. Specialized in MikroTik, networking, and cybersecurity with MTCNA and MTCTCE certifications.",
      robots: "index, follow",
      keywords:
        "Rizky Fauzan Hanif, Network Engineer, MikroTik, MTCNA, MTCTCE, IPv6, Networking, Cybersecurity, Student, Indonesia",
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
    "nuxt-umami",
  ],
});
