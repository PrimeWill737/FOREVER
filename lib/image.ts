/**
 * File extensions that Next.js Image optimization (sharp) does not support.
 * For these we use unoptimized so the browser loads the URL directly.
 */
const UNOPTIMIZED_EXTENSIONS = [
  '.heic',
  '.heif',
  '.tiff',
  '.tif',
  '.bmp',
  '.raw',
  '.arw',
  '.cr2',
  '.nef',
  '.orf',
  '.rw2',
];

/**
 * Returns true if the image URL points to a format that should skip Next.js optimization
 * (e.g. HEIC, HEIF, TIFF). Use with <Image unoptimized={...} />.
 */
export function isUnoptimizedImageFormat(url: string | undefined | null): boolean {
  if (!url || typeof url !== 'string') return false;
  const lower = url.toLowerCase();
  const pathname = lower.includes('?') ? lower.slice(0, lower.indexOf('?')) : lower;
  return UNOPTIMIZED_EXTENSIONS.some((ext) => pathname.endsWith(ext));
}

/**
 * Use for Next.js <Image unoptimized={...} />:
 * - Local paths (no http): unoptimized
 * - Remote URLs in unsupported formats (HEIC, etc.): unoptimized
 * - Remote JPEG/PNG/WebP/AVIF: use optimizer
 */
export function imageUnoptimized(src: string | undefined | null): boolean {
  if (!src?.startsWith('http')) return true;
  return isUnoptimizedImageFormat(src);
}
