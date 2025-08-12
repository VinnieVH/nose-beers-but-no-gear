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
    const data = await api.fetchCharacterEquipment(name)
    // Shallow validation of the fields we consume
    const EquippedItemSchema = z.object({
      item: z.object({ id: z.number() }),
      name: z.string(),
      slot: z.object({ type: z.string(), name: z.string() }),
      quality: z.object({ type: z.string(), name: z.string() }),
      media: z.object({ id: z.number() }),
    }).passthrough()
    const ResponseSchema = z.object({
      character: z.object({ name: z.string(), realm: z.object({ name: z.string(), slug: z.string() }) }),
      equipped_items: z.array(EquippedItemSchema),
    })
    const parsed = ResponseSchema.safeParse(data)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid character equipment payload' }, { status: 502 })
    }
    return NextResponse.json(parsed.data)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Internal server error', details: message }, { status: 500 })
  }
}