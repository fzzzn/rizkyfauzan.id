# rizkyfauzan.id

Personal website of Rizky Fauzan Hanif

## 🌐 Live Site

Visit: **[rizkyfauzan.id](https://rizkyfauzan.id)**

## ✨ Features

- **About Me** - Learn about my journey in networking, cloud engineering, and cybersecurity
- **Achievements & Certificates** - Showcase of professional certifications, competition wins, and verified credentials
- **Contact** - Real-time Discord status (via Lanyard) and multiple ways to connect
- **Interactive Guestbook** - Leave a message with Google, GitHub, or Discord OAuth (PKCE), inline delete confirmation, and per-user rate limiting
- **Resume** - Bilingual (EN/ID) resume with print-optimized A4 layout
- **Light / Dark / System Theme** - Pre-paint theme script with synced `theme-color` meta tag
- **Credits** - Acknowledgements and inspirations
- **Custom 404 Page** - Glitch-effect error page with smooth transitions

## 🛠️ Built With

- **[Nuxt 4](https://nuxt.com/)** - Full-stack Vue framework
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Supabase](https://supabase.com/)** - Backend for guestbook authentication & storage
- **[GSAP](https://gsap.com/)** - Scroll reveals, SplitText, and modal/sidebar transitions
- **[Sharp](https://sharp.pixelplumbing.com/)** - Build-time AVIF/WebP image optimization pipeline
- **[Cloudflare Pages](https://pages.cloudflare.com/)** - Edge hosting and deployment
- **TypeScript** - Type safety and better development experience

## 🎯 Highlights

- **Modern Design** - Clean, responsive monochrome interface with light/dark mode
- **Build-Time Image Optimization** - Raw images in `assets/images/` are compiled into content-hashed AVIF & WebP variants served via `<picture>` in `OptimizedImg.vue`
- **Security Hardened** - Same-origin checks on mutating API routes, 60s guestbook post cooldown, `httpOnly` PKCE session cookies, HSTS, and CSP Report-Only headers
- **SEO Optimized** - Structured data (Schema.org), Open Graph metadata, robots, and sitemap
- **Accessible** - Keyboard-accessible cards & modals with `role="dialog"` focus management, single `<main>` landmark, and `prefers-reduced-motion` support
- **Analytics** - Privacy-friendly tracking with Umami

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/fzzzn/rizkyfauzan.id
cd rizkyfauzan.id

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Start development server
npm run dev

# Optimize local images (also runs automatically on prebuild)
npm run optimize-images

# Lint codebase
npm run lint

# Build for production
npm run build
```

### Supabase Setup

1. Create a new project on [Supabase](https://supabase.com/)
2. Enable **Google**, **GitHub**, and **Discord** auth providers under **Authentication > Providers**
3. Set the redirect URL to `https://yourdomain.com/api/auth/callback`
4. Run the following SQL in the **SQL Editor** to create the guestbook table:

```sql
-- Create guestbook table
create table guestbook (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  username text not null,
  avatar_url text,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table guestbook enable row level security;

-- Policies
create policy "Users can view all guestbook entries" on guestbook
  for select using (true);

create policy "Users can insert their own guestbook entries" on guestbook
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own guestbook entries" on guestbook
  for update using (auth.uid() = user_id);

create policy "Users or admins can delete guestbook entries" on guestbook
  for delete using (
    auth.uid() = user_id
    or lower(auth.jwt() ->> 'email') in ('rizkyfauzanid@gmail.com', 'contact@rizkyfauzan.id', 'rizkyfauzanhanif984@gmail.com')
  );
```

5. Copy your **Project URL** and **anon key** from **Settings > API** into your `.env` file:

```env
NUXT_SUPABASE_URL=https://your-project.supabase.co
NUXT_SUPABASE_KEY=your-anon-key
```

### Cloudflare Deployment

When deploying to Cloudflare Pages, add your Supabase credentials as secrets via the **Cloudflare Dashboard**:

1. Go to **Workers & Pages > your project > Settings > Environment variables**
2. Add the following secrets:

| Variable | Value |
|---|---|
| `NUXT_SUPABASE_URL` | `https://your-project.supabase.co` |
| `NUXT_SUPABASE_KEY` | `your-anon-key` |

### Keeping Supabase Awake

Free Supabase projects pause after 7 days without database activity, and
opening the dashboard does not count. `.github/workflows/keep-supabase-awake.yml`
runs daily at 03:17 UTC and requests `/api/guestbook`, which performs a real
query against the table. A failed run means the project is paused or the
deployment is misconfigured. Trigger it manually via **Actions > Keep Supabase
awake > Run workflow**.

## 📁 Project Structure

```
rizkyfauzan.id/
├── app/
│   ├── assets/css/          # Global styles & theme tokens
│   ├── components/          # Reusable Vue components
│   │   ├── ImageCard.vue
│   │   ├── MessageCards.vue
│   │   ├── NavigationBar.vue
│   │   ├── OptimizedImg.vue
│   │   ├── PageHeader.vue
│   │   ├── PhotoModal.vue
│   │   ├── SideBar.vue
│   │   └── WebFooter.vue
│   ├── composables/         # Shared reactive state & animations
│   │   ├── useAboutIntro.ts
│   │   ├── useColorMode.ts
│   │   ├── useScrollReveal.ts
│   │   └── useSidebarState.ts
│   ├── data/                # Single-source portfolio & resume data
│   │   └── resume.ts
│   ├── generated/           # Auto-generated image manifest (gitignored)
│   ├── layouts/             # Page layouts
│   │   ├── blank.vue
│   │   └── default.vue
│   ├── pages/               # File-based routing
│   │   ├── index.vue        # Home
│   │   ├── about.vue
│   │   ├── achievements.vue
│   │   ├── certificates.vue
│   │   ├── contact.vue
│   │   ├── credits.vue
│   │   ├── guestbook.vue
│   │   └── resume.vue
│   ├── utils/               # Client-side utilities
│   │   ├── discord.ts
│   │   ├── imagekit.ts
│   │   └── quotes.ts
│   ├── app.vue              # Root component
│   └── error.vue            # Custom error page
├── assets/
│   └── images/              # Raw source images processed by optimize-images
├── server/
│   ├── api/
│   │   ├── auth/            # OAuth (PKCE) endpoints
│   │   │   ├── callback.get.ts
│   │   │   ├── login.get.ts
│   │   │   ├── signout.post.ts
│   │   │   └── user.get.ts
│   │   └── guestbook/       # Guestbook CRUD
│   │       ├── [id].delete.ts
│   │       ├── index.get.ts
│   │       └── index.post.ts
│   ├── middleware/
│   │   └── www-redirect.ts  # 301 redirect www -> apex domain
│   └── utils/
│       └── supabase.ts
├── public/                  # Static assets, _headers, & generated /images/*
├── scripts/
│   └── optimize-images.mjs  # Build-time AVIF/WebP generator
├── nuxt.config.ts
├── wrangler.toml            # Cloudflare Pages config
└── package.json
```
