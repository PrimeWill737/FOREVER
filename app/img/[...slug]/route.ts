import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

const IMG_DIR = path.join(process.cwd(), 'img');
const MIMES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.heic': 'image/heic',
  '.svg': 'image/svg+xml',
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  if (!slug?.length) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const safePath = path.join(IMG_DIR, ...slug);
  const realDir = path.resolve(IMG_DIR);
  const resolved = path.resolve(safePath);
  const relative = path.relative(realDir, resolved);
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  if (!fs.existsSync(safePath) || !fs.statSync(safePath).isFile()) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const ext = path.extname(safePath).toLowerCase();
  const contentType = MIMES[ext] || 'application/octet-stream';
  const body = fs.readFileSync(safePath);

  return new NextResponse(body, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
