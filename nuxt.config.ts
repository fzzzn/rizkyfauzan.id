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
  app: {
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "utf-8" },
      ],
      link: [{ rel: "icon", type: "image/png", href: "/logo.png" }],
    },
  },
  site: {
    url: "https://rizkyfauzan.id",
    name: "Rizky Fauzan Hanif",
  },
  seo: {
    meta: {
      description: "My awesome website",
      twitterCreator: "@fzzznh",
      author: "Rizky Fauzan Hanif",
      applicationName: "Rizky Fauzan Hanif",

      // Nuxt SEO Utils already sets the below tags for you
      ogSiteName: "Rizky Fauzan Hanif",
      ogLocale: "en_US",
      ogType: "website",
      ogUrl: "https://rizkyfauzan.id",
      ogTitle: "Rizky Fauzan Hanif",

      robots: "index, follow",
    },
  },
  schemaOrg: {
    identity: definePerson({
      name: "Rizky Fauzan Hanif",
      givenName: "Fauzan",
      image: "/me.png",
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
  ],
});
