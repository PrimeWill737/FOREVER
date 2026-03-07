# William & Esther · Forever

A couple website with Our Story, Gallery, RSVP, and admin panel. Built with Next.js 14, TypeScript, SCSS, and Supabase.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Supabase**
   - Create a project at [supabase.com](https://supabase.com).
   - In the SQL Editor, run the schema: copy the contents of `supabase/schema.sql` and execute it.
   - Create an admin user (Authentication → Users → Add user) for the admin panel.
   - In Project Settings → API, copy the project URL and anon key.

3. **Environment**
   - Copy `.env.example` to `.env.local`.
   - Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
   - For local dev without auth, you can set `NEXT_PUBLIC_ADMIN_AUTH_DISABLED=true` (optional).

4. **Images**
   - Place your images in `public/img/` so they are available at `/img/...`.
   - The hero image is expected at `public/img/IMG_2527.JPG` when no gallery hero is set in the admin.
   - You can copy the contents of your existing `img` folder into `public/img/`.

5. **Run**
   ```bash
   npm run dev
   ```
   - Public site: [http://localhost:3000](http://localhost:3000)
   - Admin: [http://localhost:3000/admin](http://localhost:3000/admin). Sign in at [http://localhost:3000/login](http://localhost:3000/login) with your Supabase user.

## Features

- **Public**: Home (hero + gallery preview), Our Story, Gallery, RSVP.
- **Admin** (sidebar): Home Page (hero text), Gallery (upload, set hero, captions), Footer (links), Wedding Card (headline, date, venue), RSVP (view responses).

## Tech

- **Next.js 14** (App Router), **TypeScript**, **SCSS** (sub-styling in `scss/`, forwarded from `styles/main.scss`).
- **Supabase**: Postgres tables and Storage bucket `gallery`; RLS for public read and authenticated write.

## Scripts

- `npm run dev` — development
- `npm run build` — production build
- `npm run start` — run production server
