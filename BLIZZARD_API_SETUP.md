# Blizzard API Setup Guide

## Getting Started with Blizzard World of Warcraft API

To use official Blizzard World of Warcraft data in your guild website, you'll need to set up API credentials through the Blizzard Developer Portal.

### Step 1: Create a Blizzard Developer Account

1. Go to [Blizzard Developer Portal](https://develop.battle.net/) and log in with your Battle.net account
2. If you don't have a Battle.net account, create one first
3. Accept the API Terms of Service if prompted

### Step 2: Create a New Client

1. Click "CREATE CLIENT" on the developer portal
2. Fill in the client information:
   - **Client Name**: Your guild website name (e.g., "Nose Beers But No Gear Website")
   - **Intended Use**: Select "Web Application" or "Desktop Application"
   - **Redirect URIs**: For development, you can use `http://localhost:5173/` or leave empty for client credentials flow
3. Click "CREATE CLIENT"
4. Note down your `Client ID` and `Client Secret` from the client details page

### Step 3: Configure Environment Variables

Add the following to your `.env` file:

```env
# Blizzard API Configuration
VITE_BLIZZARD_API_CLIENT_ID=your_blizzard_client_id_here
VITE_BLIZZARD_API_CLIENT_SECRET=your_blizzard_client_secret_here
```

Replace `your_blizzard_client_id_here` and `your_blizzard_client_secret_here` with the actual values from Step 2.

### Step 4: Update Guild Configuration

Ensure your guild configuration in `src/config/guild.ts` or environment variables includes the correct region:

```typescript
export const GUILD_REGION = 'us' // Options: 'us', 'eu', 'kr', 'tw', 'cn'
```

Or in your `.env` file:
```env
VITE_GUILD_REGION=us
```

### Step 5: Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to the Roster page or any page that uses WoW API data
3. Check the browser console for any API errors
4. If credentials are missing, you'll see fallback data with a warning message

## API Features Implemented

The Blizzard API integration includes:

### Guild Information
- **Guild Profile**: Name, faction, realm, creation date
- **Member Count**: Total active members
- **Achievement Points**: Guild's total achievement score
- **Realm Details**: Server information and timezone

### Guild Roster
- **Character Profiles**: Name, level, class, race
- **Character Details**: Individual character information
- **Rank System**: Guild rank hierarchy
- **Activity Status**: Member activity tracking

### Guild Achievements
- **Achievement History**: Completed guild achievements
- **Recent Events**: Latest accomplishments
- **Point Totals**: Achievement point calculations
- **Criteria Progress**: Achievement completion status

### Guild Activity
- **Recent Activity**: Latest guild events and milestones
- **Encounter Victories**: Raid boss kills and completions
- **Member Achievements**: Individual member accomplishments
- **Progression Tracking**: Guild advancement metrics

## Regional Configuration

The API supports multiple regions with different endpoints:

| Region | Code | API Endpoint | OAuth Endpoint |
|--------|------|--------------|----------------|
| Americas | `us` | `https://us.api.blizzard.com` | `https://oauth.battle.net` |
| Europe | `eu` | `https://eu.api.blizzard.com` | `https://oauth.battle.net` |
| Korea | `kr` | `https://kr.api.blizzard.com` | `https://oauth.battle.net` |
| Taiwan | `tw` | `https://tw.api.blizzard.com` | `https://oauth.battle.net` |
| China | `cn` | `https://gateway.battlenet.com.cn` | `https://oauth.battlenet.com.cn` |

**Note**: The implementation automatically handles region-specific endpoints and namespaces.

## Authentication Flow

The integration uses OAuth 2.0 Client Credentials flow:

1. **Token Request**: Automatically requests access token using client credentials
2. **Token Caching**: Stores token and expiration time to minimize requests
3. **Auto-Refresh**: Automatically refreshes token before expiration
4. **Error Handling**: Graceful fallback when authentication fails

## API Namespaces

The WoW API uses different namespaces for different data types:

- **Profile Data**: `profile-classic-{region}` (used for guild and character data)
- **Game Data**: `static-classic-{region}` (used for game assets and references)
- **Dynamic Data**: `dynamic-classic-{region}` (used for real-time data)

The implementation automatically uses the correct namespace based on the data type and region.

## Rate Limiting

Blizzard API has rate limits:
- **100 requests per second** per client
- **36,000 requests per hour** per client
- **100 requests per second** per IP address

The implementation includes:
- Automatic token caching to reduce authentication requests
- Concurrent request handling for efficiency
- Error handling for rate limit responses

## Troubleshooting

### Common Issues:

1. **"Blizzard API credentials not configured"**
   - Ensure your `.env` file exists with correct variable names
   - Check that both `VITE_BLIZZARD_API_CLIENT_ID` and `VITE_BLIZZARD_API_CLIENT_SECRET` are set
   - Restart your development server after adding environment variables

2. **"OAuth token request failed"**
   - Verify your client credentials are correct
   - Check that your client is active in the Blizzard Developer Portal
   - Ensure you're using the correct OAuth endpoint for your region

3. **"Guild not found" errors**
   - Verify the guild name, realm, and region are exactly correct
   - Guild names are case-sensitive
   - Realm names should match the official Blizzard realm names
   - Some realms have special characters or spacing

4. **"Unsupported region" errors**
   - Ensure your region code is one of: `us`, `eu`, `kr`, `tw`, `cn`
   - Check that the region matches your actual guild's region

5. **CORS errors**
   - Blizzard API supports CORS for web applications
   - If you encounter CORS issues, check your client configuration
   - Ensure your redirect URIs include your development domain

6. **Rate limiting**
   - If you hit rate limits, the API will return 429 status codes
   - Implement proper retry logic with exponential backoff
   - Consider caching frequently accessed data

### Debugging Tips:

1. **Check Network Tab**: Monitor API requests in browser dev tools
2. **Console Logging**: Enable detailed logging in the WoW API service
3. **Test with Direct Calls**: Use tools like Postman to test API endpoints directly
4. **Verify Credentials**: Double-check client ID and secret formatting

## API Endpoints Used

The integration uses these main endpoints:

```
GET /data/wow/guild/{realmSlug}/{guildSlug}
GET /data/wow/guild/{realmSlug}/{guildSlug}/roster
GET /data/wow/guild/{realmSlug}/{guildSlug}/achievements
GET /data/wow/guild/{realmSlug}/{guildSlug}/activity
```

### Example API Response:

```json
{
  "id": 123456,
  "name": "Nose Beers But No Gear",
  "faction": {
    "type": "HORDE",
    "name": "Horde"
  },
  "achievement_points": 1250,
  "member_count": 45,
  "realm": {
    "name": "Stormrage",
    "slug": "stormrage"
  },
  "created_timestamp": 1234567890000
}
```

## Data Processing

The API service includes data transformation:

1. **Slug Conversion**: Converts guild/realm names to URL-safe slugs
2. **Timestamp Handling**: Converts timestamps to JavaScript Date objects
3. **Faction Normalization**: Standardizes faction data across different contexts
4. **Class/Race Mapping**: Maps class and race IDs to readable names

## Security Best Practices

1. **Environment Variables**: Never commit API credentials to version control
2. **Client-Side Limitations**: Client credentials are visible in browser
3. **Public Data Only**: Only use for publicly available guild information
4. **Rate Limiting**: Implement proper rate limiting to avoid API abuse
5. **Error Handling**: Don't expose sensitive error information to users

## Advanced Configuration

### Custom Namespaces
```typescript
// For custom namespace requirements
const customNamespace = `profile-classic-${region}`
```

### Concurrent Requests
```typescript
// The API supports concurrent requests for better performance
const [guild, roster, achievements] = await Promise.all([
  fetchGuild(realmSlug, guildSlug, region),
  fetchGuildRoster(realmSlug, guildSlug, region),
  fetchGuildAchievements(realmSlug, guildSlug, region)
])
```

### Error Recovery
```typescript
// Built-in error recovery with fallback data
const guildData = await fetchGuild(realmSlug, guildSlug, region)
if (!guildData) {
  // Fallback to cached data or default values
}
```

## Integration with WarcraftLogs

The Blizzard API complements WarcraftLogs data:

- **Blizzard API**: Official guild information, roster, achievements
- **WarcraftLogs**: Combat performance, raid logs, detailed analysis
- **Combined**: Complete guild website with official data and performance metrics

## Documentation and Resources

- **Official API Documentation**: https://develop.battle.net/documentation/world-of-warcraft-classic
- **Developer Portal**: https://develop.battle.net/
- **Community Forums**: https://us.forums.blizzard.com/en/blizzard/c/api-discussion
- **API Status**: https://status.battle.net/

## Limits and Considerations

1. **Classic WoW Only**: This setup is configured for Classic WoW
2. **Public Data**: Only public guild information is accessible
3. **Real-time Updates**: Data may have slight delays (typically 1-15 minutes)
4. **Maintenance Windows**: API may be unavailable during Blizzard maintenance

## Example Usage

```typescript
// Basic guild information
const guild = await fetchGuildInfo('My Guild', 'Stormrage', 'us')

// Complete guild data
const allData = await fetchAllGuildData('My Guild', 'Stormrage', 'us')
console.log(allData.guild, allData.roster, allData.achievements)
```

---

**Note**: The Blizzard API is optional for the guild website. The site will function with WarcraftLogs API alone, but Blizzard API provides additional official data and enhanced features. 