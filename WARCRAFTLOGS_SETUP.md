# WarcraftLogs API Setup Guide

## Getting Started with WarcraftLogs API

To use real WarcraftLogs data in your guild website, you'll need to set up API credentials.

### Step 1: Create a WarcraftLogs Client

1. Go to [WarcraftLogs](https://www.warcraftlogs.com/) and log in
2. Navigate to the [Client Management Page](https://www.warcraftlogs.com/api/clients/)
3. Click "Create Client"
4. Fill in the form:
   - **Client Name**: Your guild website name (e.g., "Nose Beers But No Gear Website")
   - **Redirect URIs**: For development, you can use `http://localhost:5173/` (or leave empty for client credentials flow)
5. Click "Create"
6. Note down your `Client ID` and `Client Secret`

### Step 2: Configure Environment Variables

Create a `.env` file in your project root with the following content:

```env
# WarcraftLogs API Configuration
VITE_WARCRAFTLOGS_CLIENT_ID=your_client_id_here
VITE_WARCRAFTLOGS_CLIENT_SECRET=your_client_secret_here
```

Replace `your_client_id_here` and `your_client_secret_here` with the actual values from Step 1.

### Step 3: Update Guild Information

In `src/context/GuildContext.tsx`, update the guild information to match your actual guild:

```typescript
const guildName = 'Your Guild Name Here'
const serverName = 'Your Server Name'
const serverRegion = 'us' // or 'eu', 'kr', 'tw', 'cn'
```

### Step 4: Test the Integration

1. Start your development server: `npm run dev`
2. Check the browser console for any API errors
3. If credentials are missing, you'll see fallback data with a warning message

## API Features Implemented

The integration includes:

- **OAuth 2.0 Authentication**: Automatic token management using client credentials flow
- **Guild Information**: Fetches basic guild data (name, server, faction)
- **Guild Members**: Retrieves character list with levels and classes
- **Raid Logs**: Gets recent guild reports with fight data
- **Error Handling**: Graceful fallbacks when API is unavailable

## Troubleshooting

### Common Issues:

1. **"API credentials not configured"**: Make sure your `.env` file exists and has the correct variable names
2. **CORS errors**: WarcraftLogs API should support CORS, but if you encounter issues, you may need a proxy
3. **Guild not found**: Verify the guild name, server name, and region are exactly correct (case-sensitive)
4. **Rate limiting**: The API has rate limits; the implementation includes token caching to minimize requests

### GraphQL Schema

The WarcraftLogs API uses GraphQL. You can explore the schema at:
https://www.warcraftlogs.com/api/v2/client

### API Documentation

For more advanced features, refer to the official WarcraftLogs API documentation:
https://www.warcraftlogs.com/help/api

## Security Notes

- Never commit your `.env` file to version control
- Client credentials are visible in the browser, so only use this for public guild data
- For private reports, you'd need to implement the authorization code flow 