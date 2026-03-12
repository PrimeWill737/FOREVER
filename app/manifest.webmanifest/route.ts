import { NextResponse } from 'next/server';

export function GET() {
  const manifest = {
    name: 'William & Esther | Forever',
    short_name: 'Forever',
    description: 'Our story, our gallery, our forever.',
    start_url: '/',
    display: 'standalone',
    background_color: '#e8dfd4',
    theme_color: '#2d2420',
    icons: [
      { src: '/icons/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/icons/icon.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'maskable' },
    ],
  };
  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/manifest+json',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
