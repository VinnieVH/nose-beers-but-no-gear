import { describe, it, expect } from 'vitest'
import { getClassIconUrl, getGuildSlug, getRealmSlug, getItemLevelBadgeClasses, formatDate, formatDateTime } from '@/app/lib/utils'

describe('utils', () => {
  it('builds class icon url', () => {
    expect(getClassIconUrl('Death Knight')).toContain('classicon_deathknight')
  })

  it('slugifies guild names', () => {
    expect(getGuildSlug("Nose Beers But No Gear")).toBe('nose-beers-but-no-gear')
  })

  it('slugifies realms with apostrophes', () => {
    expect(getRealmSlug("Zul'jin")).toBe('zul-jin')
  })

  it('returns badge classes for ilvl thresholds', () => {
    expect(getItemLevelBadgeClasses(480)).toMatch(/legendary/)
    expect(getItemLevelBadgeClasses(470)).toMatch(/epic/)
    expect(getItemLevelBadgeClasses(450)).toMatch(/rare/)
  })

  it('formats dates', () => {
    const d = new Date('2020-01-02T00:00:00Z')
    expect(formatDate(d)).toBeTypeOf('string')
    expect(formatDateTime(d)).toBeTypeOf('string')
  })
})

