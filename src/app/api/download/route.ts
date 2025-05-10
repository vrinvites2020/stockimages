import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fileId = searchParams.get('id');

  if (!fileId) {
    return NextResponse.json({ error: 'Missing file ID' }, { status: 400 });
  }

  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
  return NextResponse.redirect(downloadUrl, 302);
} 