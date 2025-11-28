// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import { definePerson } from "nuxt-schema-org/schema";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  pages: true,
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
    build: {
      sourcemap: false,
      minify: "esbuild",
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            gsap: ["gsap"],
          },
        },
      },
    },
  },
  experimental: {
    payloadExtraction: true,
    componentIslands: true,
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
    defaults: {
      weights: [400, 700],
      styles: ["normal"],
      subsets: ["latin"],
    },
    families: [
      { name: "Antonio", provider: "google", global: true, preload: true, weights: [700] },
      { name: "Geist", provider: "google", global: true, preload: true },
      { name: "JetBrains Mono", provider: "google", global: true, weights: [400] },
    ],
    experimental: {
      processCSSVariables: true,
    },
  },
  nitro: {
    preset: "cloudflare_pages",
    prerender: {
      autoSubfolderIndex: false,
    },
    compressPublicAssets: true,
    minify: true,
  },
  routeRules: {
    "/_nuxt/**": {
      headers: { "cache-control": "public, max-age=31536000, immutable" },
    },
    "/favicon.ico": {
      headers: { "cache-control": "public, max-age=86400" },
    },
    "/*.png": {
      headers: { "cache-control": "public, max-age=86400" },
    },
  },
  app: {
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "utf-8" },
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "anonymous" },
        { rel: "dns-prefetch", href: "https://fonts.gstatic.com" },
      ],
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
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxtjs/seo",
    "@nuxtjs/supabase",
    "nuxt-umami",
  ],
  image: {
    provider: "ipx",
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  icon: {
    mode: "css",
    cssLayer: "icons",
  },
});
