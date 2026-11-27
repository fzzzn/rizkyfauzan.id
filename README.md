<div align="center">

# `rizkyfauzan.id`

**Personal website & portfolio of Rizky Fauzan Hanif**  
Network & DevOps Engineer · MTCNA · MTCTCE · IPv6 Sage

[![Live Site](https://img.shields.io/badge/live-rizkyfauzan.id-141414?style=flat-square)](https://rizkyfauzan.id)
[![Nuxt 4](https://img.shields.io/badge/Nuxt-4-00DC82?style=flat-square&logo=nuxt&logoColor=white)](https://nuxt.com)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-F38020?style=flat-square&logo=cloudflarepages&logoColor=white)](https://pages.cloudflare.com)
[![Supabase](https://img.shields.io/badge/Supabase-Auth_%26_DB-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com)
[![CI](https://github.com/fzzzn/rizkyfauzan.id/actions/workflows/ci.yml/badge.svg)](https://github.com/fzzzn/rizkyfauzan.id/actions/workflows/ci.yml)

[Visit Live Site](https://rizkyfauzan.id) · [Projects](https://rizkyfauzan.id/projects) · [Resume](https://rizkyfauzan.id/resume) · [Network Info](https://rizkyfauzan.id/net) · [Guestbook](https://rizkyfauzan.id/guestbook)

</div>

---

## Pages & Features

| Route | Description |
| :--- | :--- |
| `/` | Minimal monochrome landing page with GSAP SplitText entrance & photo lightbox |
| `/about` | Bio, quick navigation, portrait lightbox, and a **Now** section |
| `/projects` | Networking, virtualization, DevOps, and software projects with stack tags |
| `/achievements` | Competition wins (MikroTik Olympiad, LKS ITNSA, LKS Cloud Computing) |
| `/certificates` | Verified certifications (MTCNA, MTCTCE, IPv6 Sage, Google, Dicoding) |
| `/contact` | Live Discord status (Lanyard), live Yogyakarta (`WIB`) clock, and one-click copy |
| `/guestbook` | Multi-provider PKCE OAuth (Google, GitHub, Discord), inline edit/delete, pagination, Owner badge, and admin message pinning |
| `/resume` | Bilingual (`EN` / `ID`) print-ready A4 CV with `?lang=` URL sync |
| `/net` | Live visitor IPv4/IPv6 dual-stack inspector (ASN, ISP, TLS, Cloudflare PoP) + 3-ping edge RTT test |
| `/credits` | Design inspiration, open-source software, fonts, icons, and services |

### Power-User Extras
- **Command Palette (`Ctrl+K` / `⌘K`)** — Jump to any page, cycle Light/Dark/System theme live, copy email/Discord, or launch hidden commands.
- **Hidden Debian 13 (`trixie`) SSH Terminal** — Press `` ` `` (backtick) or run `Ctrl+K` → `ssh` for an interactive bash-style CLI with **Tab** autocomplete, live `dig` (Cloudflare DoH), live `ping` (HTTP edge RTT), `ip addr`, `neofetch`/`fastfetch`, and `nano` saving directly to [`haste.zxn.my.id`](https://haste.zxn.my.id).

---

## Engineering Highlights

- **Build-Time Image & OG Pipelines (`Sharp`)** — Raw photos in `assets/images/` compile into content-hashed AVIF/WebP variants served via `<picture>` (`OptimizedImg.vue`). Per-page `1200×630` Open Graph cards generate into `public/og/*.png` at build time with **0 runtime Worker bloat**.
- **Edge SSR & AI-Ready** — Zero-runtime prerendered sitemap, curated `/llms.txt` with `Content-Signal` directives, runtime `.md` page routes, `www` → apex 301 redirect middleware, and `<600 kB` gzipped Worker bundle.
- **Security Hardened** — `httpOnly` PKCE session cookies, same-origin checks on all mutating API routes, 60s guestbook post cooldown, Postgres RLS policies, HSTS, and CSP Report-Only headers.
- **Accessible & Theme-Aware** — Skip-to-content link, `role="dialog"` focus management on modals/palettes, WCAG AA contrast across light & dark palettes, dynamic `theme-color` meta, and `prefers-reduced-motion` support.
- **Automated CI & Keep-Alive** — GitHub Actions runs lint, server typecheck, and production build on every push/PR, plus a daily ping keeping the Supabase free tier awake.

---

## Quick Start

```bash
git clone https://github.com/fzzzn/rizkyfauzan.id
cd rizkyfauzan.id
npm install
cp .env.example .env   # add NUXT_SUPABASE_URL & NUXT_SUPABASE_KEY
npm run dev
```

### Scripts

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Start local Nuxt dev server |
| `npm run build` | Optimize images, generate per-page OG cards, and build for Cloudflare Pages |
| `npm run lint` | Run ESLint across the repository |
| `npm run optimize-images` | Compile `assets/images/*` into hashed AVIF/WebP variants |
| `npm run generate-og` | Generate `public/og/*.png` cards for every page |
| `npx tsc --noEmit -p server/tsconfig.json` | Typecheck Nitro server routes & utilities |

---

## Deployment & Setup

### Environment Variables

Set these in `.env` (local) and **Cloudflare Dashboard → Workers & Pages → Settings → Environment variables** (production):

```env
NUXT_SUPABASE_URL=https://your-project.supabase.co
NUXT_SUPABASE_KEY=your-anon-key
```

<details>
<summary><strong>Supabase OAuth & SQL Schema Setup</strong></summary>

1. Create a project on [Supabase](https://supabase.com/).
2. Enable **Google**, **GitHub**, and **Discord** under **Authentication → Providers**.
3. Set the redirect URL to `https://yourdomain.com/api/auth/callback`.
4. Run this SQL in the **SQL Editor**:

```sql
create table guestbook (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  username text not null,
  avatar_url text,
  message text not null,
  pinned boolean default false not null,
  is_owner boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table guestbook enable row level security;

create policy "Users can view all guestbook entries" on guestbook
  for select using (true);

create policy "Users can insert their own guestbook entries" on guestbook
  for insert with check (auth.uid() = user_id);

create policy "Users or admins can update guestbook entries" on guestbook
  for update using (
    auth.uid() = user_id
    or lower(auth.jwt() ->> 'email') in ('rizkyfauzanid@gmail.com', 'contact@rizkyfauzan.id', 'rizkyfauzanhanif984@gmail.com')
  );

create policy "Users or admins can delete guestbook entries" on guestbook
  for delete using (
    auth.uid() = user_id
    or lower(auth.jwt() ->> 'email') in ('rizkyfauzanid@gmail.com', 'contact@rizkyfauzan.id', 'rizkyfauzanhanif984@gmail.com')
  );
```

> **Keep-alive:** `.github/workflows/keep-supabase-awake.yml` queries `/api/guestbook` daily at 03:17 UTC so the free Supabase project never pauses due to inactivity.

</details>

<details>
<summary><strong>Project Structure</strong></summary>

```text
rizkyfauzan.id/
├── app/
│   ├── assets/css/          # Global styles & light/dark semantic tokens
│   ├── components/
│   │   ├── CommandPalette.vue
│   │   ├── ImageCard.vue
│   │   ├── MessageCards.vue
│   │   ├── NavigationBar.vue
│   │   ├── OptimizedImg.vue
│   │   ├── PageHeader.vue
│   │   ├── PhotoModal.vue
│   │   ├── SideBar.vue
│   │   ├── SshTerminal.vue
│   │   └── WebFooter.vue
│   ├── composables/         # Theme, scroll reveals, OG images, sidebar state
│   ├── data/resume.ts       # Single-source portfolio, projects, Now & CV data
│   ├── generated/           # Auto-generated image manifest (gitignored)
│   ├── layouts/             # default.vue & blank.vue
│   ├── pages/               # /, about, projects, achievements, certificates, contact, guestbook, resume, net, credits
│   ├── plugins/             # DevTools console greeting
│   └── utils/               # Discord (Lanyard), ImageKit, quotes
├── assets/images/           # Raw source images compiled at build time
├── server/
│   ├── api/
│   │   ├── auth/            # PKCE OAuth login, callback, user, signout
│   │   ├── guestbook/       # Paginated GET, POST, PATCH (pin/edit), DELETE
│   │   ├── dns.get.ts       # Live Cloudflare DoH lookup for `dig`
│   │   ├── haste.post.ts    # Proxy for `nano` → haste.zxn.my.id
│   │   ├── ip-info.get.ts   # Secondary IPv4/IPv6 ASN & location lookup
│   │   └── network.get.ts   # Cloudflare visitor IP/ASN/PoP telemetry
│   ├── middleware/          # 301 www → apex redirect
│   └── utils/supabase.ts    # Supabase clients, PKCE, admin & origin checks
├── scripts/
│   ├── optimize-images.mjs  # Build-time AVIF/WebP generator
│   └── generate-og-images.mjs # Build-time per-page 1200×630 OG cards
├── public/                  # Static assets, _headers, generated /images & /og
├── .github/workflows/       # ci.yml & keep-supabase-awake.yml
├── nuxt.config.ts
└── wrangler.toml
```

</details>
