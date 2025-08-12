import { NextRequest, NextResponse } from 'next/server'
import { WowAPI } from '@/app/lib/wowApi'
import { z } from 'zod'

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url)
  const name = searchParams.get('name')

  if (!name) {
    return NextResponse.json({ error: 'Missing character name' }, { status: 400 })
  }

  try {
    const api = new WowAPI()
    const profile = await api.fetchCharacterProfile(name)
    // Validate a subset we use downstream
    const ProfileSchema = z.object({
      name: z.string(),
      average_item_level: z.number().optional(),
      character_class: z.object({ name: z.string() }),
    }).passthrough()
    const parsed = ProfileSchema.safeParse(profile)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid character profile payload' }, { status: 502 })
    }
    return NextResponse.json(parsed.data)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Failed to fetch character profile', details: message },
      { status: 500 }
    )
  }
}


