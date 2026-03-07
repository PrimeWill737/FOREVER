-- William & Esther - Forever site schema for Supabase
-- Run this in Supabase SQL editor to create tables and storage buckets

-- Enable extensions. In Supabase, pgcrypto is often in the "extensions" schema; use extensions.crypt / extensions.gen_salt below.
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ============================================
-- Site settings (home hero, footer, wedding card text, etc.)
-- ============================================
create table if not exists public.site_settings (
  id uuid primary key default uuid_generate_v4(),
  key text unique not null,
  value jsonb not null default '{}',
  updated_at timestamptz default now()
);

-- ============================================
-- Gallery images (displayed on landing + gallery page)
-- ============================================
create table if not exists public.gallery (
  id uuid primary key default uuid_generate_v4(),
  storage_path text not null,
  url text,
  caption text,
  sort_order int not null default 0,
  is_hero boolean default false,
  created_at timestamptz default now()
);

-- ============================================
-- Our Story sections (optional rich content)
-- ============================================
create table if not exists public.our_story (
  id uuid primary key default uuid_generate_v4(),
  title text,
  body text,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

-- ============================================
-- Wedding card / invite content
-- ============================================
create table if not exists public.wedding_card (
  id uuid primary key default uuid_generate_v4(),
  headline text,
  date_text text,
  venue text,
  extra_content jsonb default '{}',
  updated_at timestamptz default now()
);

-- ============================================
-- RSVP responses
-- ============================================
create table if not exists public.rsvp (
  id uuid primary key default uuid_generate_v4(),
  guest_name text not null,
  email text,
  attending boolean not null,
  plus_one boolean default false,
  plus_one_name text,
  dietary text,
  message text,
  created_at timestamptz default now()
);

-- ============================================
-- Admin credentials (table-based login)
-- Login: EstherWilliam@gmail.com / 001977
-- ============================================
create table if not exists public.admin_credentials (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  password_hash text not null,
  created_at timestamptz default now()
);

-- Insert default admin user (password: 001977).
-- If you get "function crypt(text, text) does not exist": go to Supabase Dashboard → Database → Extensions, enable "pgcrypto".
-- Then if it still errors, try replacing "extensions." with "public." in the line below (some projects have pgcrypto in public).
insert into public.admin_credentials (email, password_hash)
values ('EstherWilliam@gmail.com', extensions.crypt('001977', extensions.gen_salt('bf')))
on conflict (email) do update set password_hash = excluded.password_hash;

-- Function to verify admin login (used by app; returns true only if email + password match)
create or replace function public.admin_check_credentials(p_email text, p_password text)
returns boolean
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  return exists (
    select 1 from public.admin_credentials
    where email = p_email and password_hash = crypt(p_password, password_hash)
  );
end;
$$;

-- Allow the app (anon) to call this function for login checks only
grant execute on function public.admin_check_credentials(text, text) to anon;
grant execute on function public.admin_check_credentials(text, text) to authenticated;

-- RLS: do not expose admin_credentials to normal queries (only the function can read)
alter table public.admin_credentials enable row level security;
drop policy if exists "admin_credentials_no_select" on public.admin_credentials;
create policy "admin_credentials_no_select" on public.admin_credentials for select using (false);

-- ============================================
-- Who Are We (William & Esther profiles)
-- ============================================
create table if not exists public.who_are_we (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  bio text,
  image_url text,
  sort_order int not null default 0,
  updated_at timestamptz default now()
);

insert into public.who_are_we (slug, name, bio, sort_order)
values
  ('william', 'William', 'A few words about William.', 0),
  ('esther', 'Esther', 'A few words about Esther.', 1)
on conflict (slug) do update set
  name = excluded.name,
  sort_order = excluded.sort_order;

-- ============================================
-- Footer links/settings
-- ============================================
create table if not exists public.footer_links (
  id uuid primary key default uuid_generate_v4(),
  label text not null,
  url text not null,
  sort_order int not null default 0
);

-- ============================================
-- RLS policies (adjust for your auth strategy)
-- Drop if exists so this script can be re-run safely.
-- ============================================
alter table public.site_settings enable row level security;
alter table public.gallery enable row level security;
alter table public.our_story enable row level security;
alter table public.wedding_card enable row level security;
alter table public.rsvp enable row level security;
alter table public.who_are_we enable row level security;
alter table public.footer_links enable row level security;

-- Public read for all content
drop policy if exists "site_settings_read" on public.site_settings;
drop policy if exists "gallery_read" on public.gallery;
drop policy if exists "our_story_read" on public.our_story;
drop policy if exists "wedding_card_read" on public.wedding_card;
drop policy if exists "who_are_we_read" on public.who_are_we;
drop policy if exists "footer_links_read" on public.footer_links;
create policy "site_settings_read" on public.site_settings for select using (true);
create policy "gallery_read" on public.gallery for select using (true);
create policy "our_story_read" on public.our_story for select using (true);
create policy "wedding_card_read" on public.wedding_card for select using (true);
create policy "who_are_we_read" on public.who_are_we for select using (true);
create policy "footer_links_read" on public.footer_links for select using (true);

-- Only authenticated (admin) can write; restrict to your admin user(s) if needed
drop policy if exists "site_settings_write" on public.site_settings;
drop policy if exists "gallery_write" on public.gallery;
drop policy if exists "our_story_write" on public.our_story;
drop policy if exists "wedding_card_write" on public.wedding_card;
drop policy if exists "who_are_we_write" on public.who_are_we;
drop policy if exists "footer_links_write" on public.footer_links;
create policy "site_settings_write" on public.site_settings for all using (auth.role() = 'authenticated');
create policy "gallery_write" on public.gallery for all using (auth.role() = 'authenticated');
create policy "our_story_write" on public.our_story for all using (auth.role() = 'authenticated');
create policy "wedding_card_write" on public.wedding_card for all using (auth.role() = 'authenticated');
create policy "who_are_we_write" on public.who_are_we for all using (auth.role() = 'authenticated');
create policy "footer_links_write" on public.footer_links for all using (auth.role() = 'authenticated');

-- RSVP: public can insert, only admin can read/update/delete
drop policy if exists "rsvp_insert" on public.rsvp;
drop policy if exists "rsvp_read" on public.rsvp;
drop policy if exists "rsvp_write" on public.rsvp;
create policy "rsvp_insert" on public.rsvp for insert with check (true);
create policy "rsvp_read" on public.rsvp for select using (auth.role() = 'authenticated');
create policy "rsvp_write" on public.rsvp for all using (auth.role() = 'authenticated');

-- ============================================
-- Storage bucket for gallery uploads
-- ============================================
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

-- Allow public read for gallery bucket
drop policy if exists "gallery_public_read" on storage.objects;
create policy "gallery_public_read" on storage.objects for select
  using (bucket_id = 'gallery');

-- Allow authenticated upload/update/delete
drop policy if exists "gallery_authenticated_write" on storage.objects;
create policy "gallery_authenticated_write" on storage.objects for all
  using (bucket_id = 'gallery' and auth.role() = 'authenticated');
