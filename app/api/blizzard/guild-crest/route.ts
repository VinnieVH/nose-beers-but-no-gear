import { NextRequest, NextResponse } from 'next/server'
import { WowAPI } from '@/app/lib/wowApi'

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url)
  const emblemId = searchParams.get('emblemId')
  const borderId = searchParams.get('borderId')

  if (!emblemId || !borderId) {
    return NextResponse.json({ error: 'Missing emblemId or borderId parameter' }, { status: 400 })
  }

  try {
    const api = new WowAPI()
    const emblem = await api.fetchGuildCrestEmblemMedia(emblemId)
    const border = await api.fetchGuildCrestBorderMedia(borderId)

    return NextResponse.json({ emblem, border })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to fetch guild crest media', details: message }, { status: 500 })
  }
}


