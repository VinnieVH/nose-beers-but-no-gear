import { NextResponse } from 'next/server'
import type { RaidHelperEventsResponse } from '../../lib/types';

const RAID_HELPER_API_URL = 'https://raid-helper.dev/api/v3/servers'
const RAID_HELPER_SERVER_ID = process.env.RAID_HELPER_SERVER_ID
const RAID_HELPER_API_KEY = process.env.RAID_HELPER_API_KEY

const EMPTY_RESPONSE: RaidHelperEventsResponse = {
  pages: 0,
  currentPage: 1,
  eventCountOverall: 0,
  eventCountTransmitted: 0,
  postedEvents: [],
}

export async function GET(request: Request): Promise<NextResponse> {
  if (!RAID_HELPER_SERVER_ID || !RAID_HELPER_API_KEY) {
    return NextResponse.json(EMPTY_RESPONSE, { status: 200 });
  }

  // Extract query params from the request URL
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') || '1'
  const includeSignUps = searchParams.get('includeSignUps') || 'false'
  const channelFilter = searchParams.get('channelFilter')
  const startTimeFilter = searchParams.get('startTimeFilter')
  const endTimeFilter = searchParams.get('endTimeFilter')

  const headers: Record<string, string> = {
    Authorization: RAID_HELPER_API_KEY,
    Page: page,
    IncludeSignUps: includeSignUps,
  }
  if (channelFilter) headers.ChannelFilter = channelFilter
  if (startTimeFilter) headers.StartTimeFilter = startTimeFilter
  if (endTimeFilter) headers.EndTimeFilter = endTimeFilter

  try {
    const res = await fetch(`${RAID_HELPER_API_URL}/${RAID_HELPER_SERVER_ID}/events`, {
      method: 'GET',
      headers,
    })
    if (!res.ok) {
      throw new Error(`Raid-helper API error: ${res.status}`)
    }
    const data: RaidHelperEventsResponse = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to fetch Raid-helper events:', error)
    return NextResponse.json(EMPTY_RESPONSE, { status: 200 })
  }
}