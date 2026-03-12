import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SW_PATH = path.join(process.cwd(), 'public', 'sw.js');

export async function GET() {
  let body: string;
  try {
    body = fs.readFileSync(SW_PATH, 'utf-8');
  } catch {
    return new NextResponse('Not found', { status: 404 });
  }

  let buildId = 'dev';
  try {
    const buildIdPath = path.join(process.cwd(), '.next', 'BUILD_ID');
    if (fs.existsSync(buildIdPath)) {
      buildId = fs.readFileSync(buildIdPath, 'utf-8').trim();
    }
  } catch {
    // ignore
  }

  const script = body.replace('__BUILD_ID__', buildId);

  return new NextResponse(script, {
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Service-Worker-Allowed': '/',
    },
  });
}
