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
          // Vite 8's Rolldown backend only accepts the function form of
          // manualChunks; the object form fails the build.
          manualChunks: (id) =>
            id.includes("node_modules/gsap") ? "gsap" : undefined,
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
      { name: "Inter", provider: "google", global: true, preload: true, weights: [400, 600, 700], subsets: ["latin"] },
      { name: "JetBrains Mono", provider: "google", global: true, preload: false, weights: [400], subsets: ["latin"] },
    ],
    // Promoted out of `experimental` in @nuxt/fonts v1.
    processCSSVariables: true,
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
    cloudflare: {
      pages: {
        routes: {
          exclude: ["/fonts/*", "/icons/*"],
        },
      },
      wrangler: {
        compatibility_flags: ["nodejs_compat"],
      },
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      // viewport and charset are Nuxt defaults, and og:site_name/og:type come
      // from the site config, so repeating them here only duplicates tags.
      meta: [
        { name: "theme-color", content: "#ffffff" },
        { name: "format-detection", content: "telephone=no" },
        { name: "msapplication-TileColor", content: "#ffffff" },
        { property: "og:image:alt", content: "Rizky Fauzan Hanif - Network Engineer" },
        { name: "twitter:image:alt", content: "Rizky Fauzan Hanif - Network Engineer" },
      ],
      link: [
        { rel: "preconnect", href: "https://u.zxn.my.id", crossorigin: "anonymous" },
        { rel: "dns-prefetch", href: "https://u.zxn.my.id" },
        { rel: "preconnect", href: "https://ik.imagekit.io", crossorigin: "anonymous" },
        { rel: "dns-prefetch", href: "https://ik.imagekit.io" },
        { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96x96.png" },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
      // main.css hides `[data-reveal]` under `html.reveal-enabled`. Setting that
      // class before paint avoids a flash of fully visible content. It is only
      // set when JS is available and motion is not reduced, so content can
      // never be left invisible.
      //
      // SPA pages only mount their content after this head has run, so the
      // matching elements do not exist yet and the rule never applies to them.
      // This script watches for them and hides each one before its first paint,
      // which is what actually removes the flash on navigation.
      script: [
        {
          innerHTML: `(function(){try{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;document.documentElement.classList.add('reveal-enabled');var s='[data-reveal],[data-intro]';var h=function(e){if(e.style.getPropertyValue('opacity')!=='0')e.setAttribute('style','opacity:0 !important;visibility:hidden')};document.querySelectorAll(s).forEach(h);new MutationObserver(function(m){var seen=[];m.forEach(function(r){var tr=r.target;if(tr.nodeType===1&&tr.matches(s))seen.push(tr);r.addedNodes.forEach(function(n){if(n.nodeType!==1)return;if(n.matches(s))seen.push(n);n.querySelectorAll(s).forEach(function(e){seen.push(e)})})});if(!seen.length)return;seen.forEach(h);setTimeout(function(){seen.forEach(h)})}).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['data-reveal','data-intro']})}catch(e){}})()`,
          tagPosition: "head",
          tagPriority: "critical",
        },
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
    // The site uses a static Open Graph image; disabling dynamic generation
    // also keeps the ~2.5 MB image renderer out of the worker bundle.
    enabled: false,
  },
  sitemap: {
    strictNuxtContentPaths: true,
  },
  robots: {
    allow: "/",
    // /api/ is deliberately open to crawlers: it backs the guestbook and the
    // Discord status on the contact page, not private data.
    // The page-level robots meta is `seo.meta.robots` below, which
    // nuxt-seo-utils turns into a per-page tag. @nuxtjs/robots also owns the
    // robots tag, and a copy in app.head makes the two fight over it.
    sitemap: "https://rizkyfauzan.id/sitemap.xml",
  },
  seo: {
    // Validate app.head against the SEO modules, but not for the robots tag.
    // nuxt-seo-utils cannot tell `seo.meta.robots` here from a robots meta in
    // app.head, and flags this one as a conflict it does not actually have.
    validateAppHead: false,
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
      ogTitle: "Rizky Fauzan Hanif - Network Engineer",
      ogDescription: "Network Engineer specializing in MikroTik, networking, and cybersecurity. MTCNA & MTCTCE certified professional based in Yogyakarta, Indonesia.",
      ogImage: "https://rizkyfauzan.id/og-image.png",
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
    "@nuxt/eslint",
  ],
  icon: {
    mode: "css",
    cssLayer: "icons",
  },
});
