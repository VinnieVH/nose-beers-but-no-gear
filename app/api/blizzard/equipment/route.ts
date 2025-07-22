import { NextRequest, NextResponse } from 'next/server';
import { WowAPI } from '@/app/lib/wowApi';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');
  if (!name) {
    return NextResponse.json({ error: 'Missing character name' }, { status: 400 });
  }

  try {
    const api = new WowAPI();
    const data = await api.fetchCharacterEquipment(name);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 