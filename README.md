🍺 Nose Beers But No Gear 🐼

A Next.js (App Router) guild website for World of Warcraft Classic. It integrates live data from WarcraftLogs and Blizzard APIs, plus optional Raid-Helper events, with a Pandaria-inspired theme.

### Features
- **Guild data**: Blizzard Guild, Roster, Achievements, Activity, Equipment, Avatars, Guild Crest media
- **WarcraftLogs**: Guild info, members, reports; optional batched fight fetching per report
- **Raid scheduling**: Optional Raid-Helper events feed
- **Responsive UI**: Tailwind CSS 4, accessible components

### Tech Stack
- **Next.js 15** (App Router) + **React 19** + **TypeScript 5**
- **Tailwind CSS 4**
- No Redux; server-first data fetching via API routes and server components

### Project Structure
```
app/
├── api/                      # API routes (server only)
│   ├── blizzard/             # Blizzard API proxies
│   │   ├── achievements/
│   │   ├── activity/
│   │   ├── avatar/
│   │   ├── equipment/
│   │   ├── guild/
│   │   ├── guild-crest/
│   │   ├── item-media/
│   │   └── roster/
│   ├── raid-helper/
│   └── warcraft-logs/
├── components/               # UI components
├── config/
│   └── guild.ts              # Reads NEXT_PUBLIC_* guild settings
├── lib/
│   ├── utils.ts              # Utilities (class colors, slugs, base URL)
│   ├── warcraftlogsApi.ts    # WCL OAuth + GraphQL client
│   └── wowApi.ts             # Blizzard OAuth + REST client
├── shared/                   # Enums and shared types
├── page.tsx                  # Home
├── raids/page.tsx            # Raids view (events + logs table placeholder)
└── roster/                   # Roster pages
    ├── page.tsx
    └── [name]/page.tsx
```

## Quick Start
1) Install dependencies
```bash
npm install
```

2) Configure environment: create a file named `.env.local` in the project root and fill it with your values. See Environment section below.

3) Run dev server
```bash
npm run dev
```
Open `http://localhost:3000`.

## Environment
Create `.env.local` with the following variables:

```env
# Public guild config (used in UI)
NEXT_PUBLIC_GUILD_NAME="Your Guild Name"
NEXT_PUBLIC_GUILD_REALM="Your Server Name"
NEXT_PUBLIC_GUILD_REGION=us
NEXT_PUBLIC_DISCORD_INVITE_URL="https://discord.gg/your-invite"

# WarcraftLogs API (required for /api/warcraft-logs)
WARCRAFTLOGS_CLIENT_ID=your_wcl_client_id
WARCRAFTLOGS_CLIENT_SECRET=your_wcl_client_secret

# Blizzard API (required for /api/blizzard/*)
BLIZZARD_API_CLIENT_ID=your_blizzard_client_id
BLIZZARD_API_CLIENT_SECRET=your_blizzard_client_secret

# Raid-Helper (optional; used by /api/raid-helper)
RAID_HELPER_SERVER_ID=your_discord_server_id
RAID_HELPER_API_KEY=your_raid_helper_api_key
```

Notes:
- Public values must be prefixed with `NEXT_PUBLIC_`.
- If Blizzard or WCL credentials are missing, related API routes return fallback or empty data.

## Built-in API Routes
- `GET /api/warcraft-logs` – Aggregates guild info, members, and recent reports from WCL. Accepts no query params; uses guild config.
- `GET /api/blizzard` – Returns grouped Blizzard guild data and link hints.
- `GET /api/blizzard/guild` – Guild profile.
- `GET /api/blizzard/roster` – Guild roster.
- `GET /api/blizzard/achievements` – Guild achievements.
- `GET /api/blizzard/activity` – Guild activity.
- `GET /api/blizzard/equipment?name=<character>` – Character equipment.
- `GET /api/blizzard/item-media?itemId=<id>` – Item media.
- `GET /api/blizzard/avatar?name=<character>` – Character avatar URL.
- `GET /api/blizzard/guild-crest?emblemId=<id>&borderId=<id>` – Guild crest media.
- `GET /api/raid-helper[?page=1&includeSignUps=false&channelFilter=&startTimeFilter=&endTimeFilter=]` – Upcoming raid events.

## Configuration
- Edit guild settings in `app/config/guild.ts` via environment variables described above.
- Tailwind theme is defined in the global styles and Tailwind config (Tailwind CSS 4). Adjust colors/utilities per project needs.

## Development
- Scripts: `npm run dev` | `npm run build` | `npm run start` | `npm run lint`
- TypeScript and ESLint are enabled. Follow the code style and naming conventions used in `app/`.

## Deployment
- Optimized for Vercel (see `vercel.json`).
- Ensure all required env vars are configured in your hosting provider.

## Docs
- WarcraftLogs setup: see `WARCRAFTLOGS_SETUP.md`.
- Blizzard API setup: see `BLIZZARD_API_SETUP.md`.

## Acknowledgments
- WarcraftLogs, Blizzard Entertainment, React, Tailwind CSS, and our guild members.

— Made with ❤️ and 🍺 by the Nose Beers But No Gear guild
