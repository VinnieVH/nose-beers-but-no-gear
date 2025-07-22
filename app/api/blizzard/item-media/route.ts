import { NextRequest, NextResponse } from 'next/server';
import { WowAPI } from '@/app/lib/wowApi';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const itemId = searchParams.get('itemId');

  if (!itemId) {
    return NextResponse.json({ error: 'Missing itemId parameter' }, { status: 400 });
  }

  try {
    const api = new WowAPI();
    const data = await api.fetchItemMedia(itemId);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch item media', details: (error as Error).message }, { status: 500 });
  }
} 