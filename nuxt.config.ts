// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import { definePerson } from "nuxt-schema-org/schema";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  pages: true,
  css: ["~/assets/css/main.css"],
  vite: {
    // @ts-expect-error - Type incompatibility between @tailwindcss/vite and Vite 7.3 types
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
    inlineRouteRules: true,
  },
  features: {
    inlineStyles: true,
  },
  umami: {
    id: "4819c176-2490-4516-88a2-ecbf77ff2ea2",
    host: "https://u.zxn.my.id",
    autoTrack: true,
  },
  fonts: {
    defaults: {
      weights: [400],
      styles: ["normal"],
      subsets: ["latin"],
    },
    families: [
      { name: "Antonio", provider: "google", global: true, preload: true, weights: [700], subsets: ["latin"] },
      { name: "Geist", provider: "google", global: true, preload: true, weights: [400], subsets: ["latin"] },
      { name: "JetBrains Mono", provider: "google", global: true, preload: false, weights: [400], subsets: ["latin"] },
    ],
    experimental: {
      processCSSVariables: true,
    },
  },
  runtimeConfig: {
    supabaseUrl: '',
    supabaseKey: '',
  },
  nitro: {
    preset: "cloudflare_pages",
    prerender: {
      autoSubfolderIndex: false,
    },
    compressPublicAssets: true,
    minify: true,
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "utf-8" },
        { name: "theme-color", content: "#ffffff" },
        { name: "format-detection", content: "telephone=no" },
        { name: "msapplication-TileColor", content: "#ffffff" },
      ],
      link: [
        { rel: "preconnect", href: "https://u.zxn.my.id", crossorigin: "anonymous" },
        { rel: "dns-prefetch", href: "https://u.zxn.my.id" },
        { rel: "preconnect", href: "https://ik.imagekit.io", crossorigin: "anonymous" },
        { rel: "dns-prefetch", href: "https://ik.imagekit.io" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  site: {
    url: "https://rizkyfauzan.id",
    name: "Rizky Fauzan Hanif",
    description: "Network Engineer specializing in MikroTik, networking, and cybersecurity. MTCNA & MTCTCE certified.",
    defaultLocale: "en",
  },
  ogImage: {
    enabled: true,
    defaults: {
      width: 1200,
      height: 630,
    },
  },
  sitemap: {
    strictNuxtContentPaths: true,
  },
  robots: {
    allow: "/",
    sitemap: "https://rizkyfauzan.id/sitemap.xml",
  },
  seo: {
    meta: {
      title: "Rizky Fauzan Hanif - Network Engineer",
      description: "Network Engineer specializing in MikroTik, networking, and cybersecurity. MTCNA & MTCTCE certified professional based in Yogyakarta, Indonesia.",
      twitterCard: "summary_large_image",
      twitterSite: "@fzzznh",
      twitterCreator: "@fzzznh",
      author: "Rizky Fauzan Hanif",
      applicationName: "Rizky Fauzan Hanif",
      ogSiteName: "Rizky Fauzan Hanif",
      ogLocale: "en_US",
      ogType: "website",
      ogUrl: "https://rizkyfauzan.id",
      ogTitle: "Rizky Fauzan Hanif - Network Engineer",
      ogDescription: "Network Engineer specializing in MikroTik, networking, and cybersecurity. MTCNA & MTCTCE certified professional based in Yogyakarta, Indonesia.",
      ogImage: "https://rizkyfauzan.id/og-image.png",
      robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      keywords: "Rizky Fauzan Hanif, Network Engineer, MikroTik, MTCNA, MTCTCE, IPv6, Networking, Cybersecurity, Indonesia, Yogyakarta, Cloud Engineer",
    },
  },
  schemaOrg: {
    identity: definePerson({
      name: "Rizky Fauzan Hanif",
      givenName: "Rizky",
      familyName: "Hanif",
      additionalName: "Fauzan",
      description: "Network Engineer specializing in MikroTik, networking, and cybersecurity with MTCNA and MTCTCE certifications.",
      jobTitle: "Network Engineer",
      email: "contact@rizkyfauzan.id",
      url: "https://rizkyfauzan.id",
      image: "https://rizkyfauzan.id/avatar-with-bg.webp",
      sameAs: [
        "https://x.com/rizkyfauzanid",
        "https://github.com/fzzzn",
        "https://linkedin.com/in/rizky-fauzan-hanif",
        "https://instagram.com/rizkyfauzan.id",
        "https://bsky.app/profile/rizkyfauzan.id",
        "https://t.me/rizkyfauzanid",
      ],
      knowsAbout: [
        "MikroTik RouterOS",
        "Network Engineering",
        "Cybersecurity",
        "IPv6",
        "Cloud Computing",
        "Linux Administration",
      ],
    }),
  },
  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxtjs/seo",
    "@nuxtjs/critters",
    "nuxt-umami",
  ],
  icon: {
    mode: "css",
    cssLayer: "icons",
  },
});
