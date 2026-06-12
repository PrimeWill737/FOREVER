/** Tile sizes cycle for editorial mosaic — not uniform squares */
export const GALLERY_TILE_SIZES = [
  'feature',
  'square',
  'portrait',
  'square',
  'wide',
  'portrait',
] as const;

export type GalleryTileSize = (typeof GALLERY_TILE_SIZES)[number];

export function getGalleryTileSize(index: number): GalleryTileSize {
  return GALLERY_TILE_SIZES[index % GALLERY_TILE_SIZES.length];
}
