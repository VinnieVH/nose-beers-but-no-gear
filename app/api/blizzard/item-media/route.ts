import { NextRequest, NextResponse } from 'next/server';
import { WowAPI } from '@/app/lib/wowApi';
import { z } from 'zod'

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const itemId = searchParams.get('itemId');

  if (!itemId) {
    return NextResponse.json({ error: 'Missing itemId parameter' }, { status: 400 });
  }

  try {
    const api = new WowAPI()
    const data = await api.fetchItemMedia(itemId)
    const Schema = z.object({ id: z.number(), assets: z.array(z.object({ key: z.string(), value: z.string().url() })) }).passthrough()
    const parsed = Schema.safeParse(data)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid item media payload' }, { status: 502 })
    }
    return NextResponse.json(parsed.data)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to fetch item media', details: message }, { status: 500 });
  }
} 