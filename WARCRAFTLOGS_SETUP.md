# WarcraftLogs API Setup Guide

This project uses the WarcraftLogs Client Credentials OAuth flow on the server (in API routes) and GraphQL to fetch data.

### 1) Create a WarcraftLogs Client
1. Log into `https://www.warcraftlogs.com/`
2. Open the client management page: `https://www.warcraftlogs.com/api/clients/`
3. Create a client and note the Client ID and Secret

No redirect URI is required for the client credentials flow used here.

### 2) Add environment variables
Create `.env.local` in the project root with:
```env
WARCRAFTLOGS_CLIENT_ID=your_client_id
WARCRAFTLOGS_CLIENT_SECRET=your_client_secret

# Guild identity used by the API client
NEXT_PUBLIC_GUILD_NAME="Your Guild Name"
NEXT_PUBLIC_GUILD_REALM="Your Server Name"
NEXT_PUBLIC_GUILD_REGION=us
```

These are read by `app/config/guild.ts` and `app/lib/warcraftlogsApi.ts`.

### 3) How it’s used in the app
- The API client lives in `app/lib/warcraftlogsApi.ts` and requests an OAuth token from `classic.warcraftlogs.com`.
- `GET /api/warcraft-logs` aggregates:
  - Guild info (`guildData.guild`)
  - Members (`guild.members.data`)
  - Reports (`reportData.reports.data`)
- Optionally, fights for each report are fetched in a single batched GraphQL query.

### 4) Test locally
```bash
npm run dev
open http://localhost:3000/api/warcraft-logs | cat
```
If credentials are missing, a warning is logged and you may get fallback/empty structures.

### Troubleshooting
- "credentials not configured": ensure both `WARCRAFTLOGS_CLIENT_ID` and `WARCRAFTLOGS_CLIENT_SECRET` are set
- "guild not found": check name, realm slug, and region; `warcraftlogsApi.ts` converts realm to slug automatically
- Rate limits: token caching reduces auth calls; avoid spamming builds

### References
- GraphQL endpoint: `https://www.warcraftlogs.com/api/v2/client`
- Docs: `https://www.warcraftlogs.com/help/api`