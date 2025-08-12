import { NextRequest, NextResponse } from 'next/server'
import { WowAPI } from '@/app/lib/wowApi'

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url)
  const name = searchParams.get('name')

  if (!name) {
    return NextResponse.json({ error: 'Missing character name' }, { status: 400 })
  }

  try {
    const api = new WowAPI()
    const profile = await api.fetchCharacterProfile(name)
    return NextResponse.json(profile)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Failed to fetch character profile', details: message },
      { status: 500 }
    )
  }
}


