import type { SupabaseClient } from '@supabase/supabase-js';
import type { GalleryImage, OurStorySection, WeddingCard, FooterLink, SiteSetting, WhoAreWeProfile } from './types';

export async function getGallery(supabase: SupabaseClient<any>): Promise<GalleryImage[]> {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return (data ?? []) as GalleryImage[];
}

export async function getOurStory(supabase: SupabaseClient<any>): Promise<OurStorySection[]> {
  const { data, error } = await supabase
    .from('our_story')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return (data ?? []) as OurStorySection[];
}

export async function getWhoAreWe(supabase: SupabaseClient<any>): Promise<WhoAreWeProfile[]> {
  const { data, error } = await supabase
    .from('who_are_we')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return (data ?? []) as WhoAreWeProfile[];
}

export async function getWeddingCard(supabase: SupabaseClient<any>): Promise<WeddingCard | null> {
  const { data, error } = await supabase
    .from('wedding_card')
    .select('*')
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data as WeddingCard | null;
}

export async function getFooterLinks(supabase: SupabaseClient<any>): Promise<FooterLink[]> {
  const { data, error } = await supabase
    .from('footer_links')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return (data ?? []) as FooterLink[];
}

export async function getSiteSetting(supabase: SupabaseClient<any>, key: string): Promise<SiteSetting | null> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('key', key)
    .maybeSingle();
  if (error) throw error;
  return data as SiteSetting | null;
}
