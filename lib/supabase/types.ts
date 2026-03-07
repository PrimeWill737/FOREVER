export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface SiteSetting {
  id: string;
  key: string;
  value: Json;
  updated_at: string;
}

export interface GalleryImage {
  id: string;
  storage_path: string;
  url: string | null;
  caption: string | null;
  sort_order: number;
  is_hero: boolean;
  created_at: string;
}

export interface OurStorySection {
  id: string;
  title: string | null;
  body: string | null;
  sort_order: number;
  created_at: string;
}

export interface WeddingCard {
  id: string;
  headline: string | null;
  date_text: string | null;
  venue: string | null;
  extra_content: Json;
  updated_at: string;
}

export interface Rsvp {
  id: string;
  guest_name: string;
  email: string | null;
  attending: boolean;
  plus_one: boolean;
  plus_one_name: string | null;
  dietary: string | null;
  message: string | null;
  created_at: string;
}

export interface WhoAreWeProfile {
  id: string;
  slug: string;
  name: string;
  bio: string | null;
  image_url: string | null;
  sort_order: number;
  updated_at: string;
}

export interface FooterLink {
  id: string;
  label: string;
  url: string;
  sort_order: number;
}

export interface RsvpInsert {
  guest_name: string;
  email?: string;
  attending: boolean;
  plus_one?: boolean;
  plus_one_name?: string;
  dietary?: string;
  message?: string;
}
