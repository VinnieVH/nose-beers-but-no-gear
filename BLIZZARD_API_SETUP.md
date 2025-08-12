# Blizzard API Setup Guide

This project calls the Blizzard World of Warcraft API from server-side API routes using the OAuth 2.0 Client Credentials flow.

### 1) Create a Blizzard client
1. Open the Blizzard Developer Portal: `https://develop.battle.net/`
2. Create a client and note the Client ID and Secret

No redirect URI is required for the client credentials flow used here.

### 2) Add environment variables
Create `.env.local` with:
```env
BLIZZARD_API_CLIENT_ID=your_blizzard_client_id
BLIZZARD_API_CLIENT_SECRET=your_blizzard_client_secret

# Guild identity used to build endpoints
NEXT_PUBLIC_GUILD_NAME="Your Guild Name"
NEXT_PUBLIC_GUILD_REALM="Your Server Name"
NEXT_PUBLIC_GUILD_REGION=us
```

These are read by `app/config/guild.ts` and `app/lib/wowApi.ts`.

### 3) How it’s used in the app
- The client is implemented in `app/lib/wowApi.ts`.
- API routes under `app/api/blizzard/*` call helper methods that:
  - Obtain an OAuth token from `https://oauth.battle.net/token`
  - Call endpoints at `https://{region}.api.blizzard.com`
  - Use Classic namespaces: `profile-classic-{region}` and `static-classic-{region}`

### 4) Test locally
```bash
npm run dev
open http://localhost:3000/api/blizzard | cat
open http://localhost:3000/api/blizzard/roster | cat
```
If credentials are missing, the routes return an error JSON.

### Regions and OAuth hosts
- Regions supported by API hosts: `us`, `eu`, `kr`, `tw`, `cn`
- Current OAuth host used by this code: `https://oauth.battle.net`
- Note: China (`cn`) requires `https://oauth.battlenet.com.cn` and is not supported out-of-the-box by the current implementation.

### Endpoints used
- `/data/wow/guild/{realmSlug}/{guildSlug}`
- `/data/wow/guild/{realmSlug}/{guildSlug}/roster`
- `/data/wow/guild/{realmSlug}/{guildSlug}/achievements`
- `/data/wow/guild/{realmSlug}/{guildSlug}/activity`
- `/profile/wow/character/{realmSlug}/{name}/equipment`
- `/data/wow/media/item/{itemId}`
- `/profile/wow/character/{realmSlug}/{name}/character-media`
- `/data/wow/media/guild-crest/emblem/{emblemId}` and `/border/{borderId}`

### Troubleshooting
- "credentials not configured": ensure both `BLIZZARD_API_CLIENT_ID` and `BLIZZARD_API_CLIENT_SECRET` are set
- "Unsupported region": `NEXT_PUBLIC_GUILD_REGION` must be one of `us`, `eu`, `kr`, `tw`, `cn`
- "Guild not found": check exact realm and guild names; slugging is handled by `getRealmSlug`/`getGuildSlug`

### References
- Classic API docs: `https://develop.battle.net/documentation/world-of-warcraft-classic`
- API status: `https://status.battle.net/`