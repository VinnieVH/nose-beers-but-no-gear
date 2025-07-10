# 🍺 Nose Beers But No Gear 🐼

A modern, responsive guild website for World of Warcraft Classic guilds built with React, TypeScript, and Tailwind CSS. Features real-time guild data integration with WarcraftLogs and Blizzard APIs, complete with a Pandaria-inspired theme and dark/light mode support.

## 🌟 Features

### Core Functionality
- **Real-time Guild Data** - Live integration with WarcraftLogs API and Blizzard WoW API
- **Guild Statistics** - Member count, realm info, faction, and creation date
- **Member Roster** - Complete guild member list with classes, levels, and roles
- **Raid Logs** - Recent raid reports with kill/wipe tracking and performance metrics
- **Activity Tracking** - Guild achievements, recent activities, and progress
- **Fight Analysis** - Detailed encounter breakdowns with filtering by kills/wipes/encounters

### User Experience
- **Responsive Design** - Mobile-first approach with seamless desktop experience
- **Dark/Light Theme** - Automatic system preference detection with manual toggle
- **Pandaria-Inspired Theme** - Custom color palette and typography
- **Loading States** - Smooth loading animations and error handling
- **Accessibility** - ARIA labels, semantic HTML, and keyboard navigation

### Technical Features
- **Type Safety** - Comprehensive TypeScript implementation with strict typing
- **Modern React** - Hooks-based architecture with custom hooks for data fetching
- **State Management** - Redux Toolkit with RTK Query for API state management
- **Performance Optimized** - React.memo, useMemo, and useCallback for optimal rendering
- **Code Quality** - ESLint configuration with React hooks and TypeScript rules

## 🛠️ Technology Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **TypeScript 5.8** - Strict type checking and latest language features
- **Tailwind CSS 4.1** - Utility-first CSS framework with custom theme
- **Vite 7** - Fast build tool with hot module replacement
- **React Router 7** - Client-side routing with modern patterns

### State Management
- **Redux Toolkit 2.8** - Modern Redux with RTK Query
- **React Redux 9.2** - React bindings for Redux
- **RTK Query** - Powerful data fetching and caching

### APIs & Services
- **WarcraftLogs API** - Combat log analysis and guild reports
- **Blizzard WoW API** - Official game data and guild information
- **OAuth 2.0** - Secure API authentication

### Development Tools
- **ESLint 9** - Code linting with React and TypeScript rules
- **Lucide React** - Beautiful, customizable icons
- **Custom Hooks** - Reusable logic for data fetching and theme management

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (Card, Button, etc.)
│   ├── sections/        # Page sections (HeroSection, GuildStatsCard)
│   ├── Header.tsx       # Navigation header
│   └── Footer.tsx       # Site footer
├── pages/               # Route components
│   ├── Home.tsx         # Landing page with guild overview
│   ├── Roster.tsx       # Guild member roster
│   ├── Raids.tsx        # Raid logs and statistics
│   └── About.tsx        # Guild information and history
├── hooks/               # Custom React hooks
│   ├── useGuildData.ts  # Guild data fetching hook
│   └── useTheme.ts      # Theme management hook
├── services/            # API services
│   ├── warcraftlogsApi.ts # WarcraftLogs API integration
│   ├── wowApi.ts        # Blizzard WoW API integration
│   └── types.ts         # API response types
├── store/               # Redux store configuration
│   ├── store.ts         # Main store setup
│   ├── hooks.ts         # Typed Redux hooks
│   ├── warcraftLogsApi.ts # RTK Query API slice
│   └── wowApi.ts        # RTK Query API slice
├── context/             # React Context providers
│   ├── ThemeContext.tsx # Theme provider
│   └── theme.ts         # Theme context definition
├── shared/              # Shared utilities and types
│   ├── types.ts         # Domain types and interfaces
│   └── enums.ts         # Application enums
├── utils/               # Utility functions
│   └── classColors.ts   # WoW class color mappings
├── config/              # Configuration files
│   └── guild.ts         # Guild-specific settings
└── assets/              # Static assets
    └── wipe-inc.jpg     # Guild logo/imagery
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- WarcraftLogs API credentials
- Blizzard API credentials (optional)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/nose-beers-but-no-gear.git
cd nose-beers-but-no-gear
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
# Guild Configuration
VITE_GUILD_NAME=Your Guild Name
VITE_GUILD_REALM=Your Server Name
VITE_GUILD_REGION=us

# WarcraftLogs API (Required)
VITE_WARCRAFTLOGS_CLIENT_ID=your_client_id
VITE_WARCRAFTLOGS_CLIENT_SECRET=your_client_secret

# Blizzard API (Optional)
VITE_BLIZZARD_API_CLIENT_ID=your_blizzard_client_id
VITE_BLIZZARD_API_CLIENT_SECRET=your_blizzard_client_secret
```

4. **Start development server**
```bash
npm run dev
```

Visit `http://localhost:5173` to view the application.

## ⚙️ Configuration

### Guild Settings
Update `src/config/guild.ts` with your guild information:

```typescript
export const GUILD_NAME = 'Your Guild Name'
export const GUILD_REALM = 'Your Server Name'
export const GUILD_REGION = 'us' // or 'eu', 'kr', 'tw', 'cn'
```

### API Configuration
See the detailed setup guides:
- [WARCRAFTLOGS_SETUP.md](WARCRAFTLOGS_SETUP.md) - WarcraftLogs API setup (required)
- [BLIZZARD_API_SETUP.md](BLIZZARD_API_SETUP.md) - Blizzard WoW API setup (optional)

### Theme Customization
The application uses a custom Pandaria-inspired theme defined in Tailwind CSS. You can modify colors in your Tailwind configuration:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        pandaria: {
          primary: '#8B4513',
          secondary: '#CD853F',
          accent: '#DAA520',
          // ... more colors
        }
      }
    }
  }
}
```

## 🔧 API Integration

### WarcraftLogs API
The application integrates with WarcraftLogs API to fetch:
- Guild information and statistics
- Member roster with characters and levels
- Raid reports and combat logs
- Fight analysis with kill/wipe tracking
- Performance metrics and rankings

**Key Features:**
- OAuth 2.0 authentication with automatic token refresh
- GraphQL queries for efficient data fetching
- Comprehensive error handling and fallbacks
- Fight filtering by type (kills, wipes, encounters, trash)

### Blizzard WoW API
Integration with official Blizzard API for:
- Guild details and faction information
- Character profiles and achievements
- Realm information and status
- Guild activity and recent achievements

**Key Features:**
- Region-specific API endpoints
- Proper namespace handling for Classic WoW
- Concurrent data fetching for performance
- Comprehensive type definitions

## 🎨 Design System

### Color Palette
- **Primary**: Pandaria-inspired earth tones
- **Secondary**: Warm golds and browns
- **Accent**: Bright highlights for interactive elements
- **Dark Mode**: Carefully crafted dark variants

### Typography
- **Font Family**: Custom "Pandaren" font for headings
- **Hierarchy**: Clear font sizes and weights
- **Readability**: Optimal line heights and contrast

### Components
- **Modular Design**: Reusable UI components
- **Consistent Spacing**: Tailwind's spacing scale
- **Responsive Layout**: Mobile-first approach

## 📱 Pages and Features

### Home Page (`/`)
- **Hero Section**: Guild name and tagline with background image
- **Guild Statistics**: Member count, realm, faction, and creation date
- **Member Preview**: Top 5 members with class colors and roles
- **Recent Activity**: Latest raid logs and achievements
- **Navigation**: Quick links to other sections

### Roster Page (`/roster`)
- **Complete Member List**: All guild members with details
- **Class Filtering**: Filter by WoW classes
- **Role Assignment**: Tank, Healer, DPS, and custom roles
- **Search Functionality**: Find members by name
- **Sorting Options**: By level, class, or join date

### Raids Page (`/raids`)
- **Recent Logs**: Latest raid reports with details
- **Fight Analysis**: Individual encounter breakdowns
- **Performance Metrics**: DPS, healing, and damage statistics
- **Kill/Wipe Tracking**: Success rates and progression
- **Filtering**: By raid tier, difficulty, and encounter type

### About Page (`/about`)
- **Guild History**: Formation and milestones
- **Guild Culture**: Values and community guidelines
- **Leadership**: Officers and key members
- **Recruitment**: Open positions and requirements

## 🔨 Development

### Code Quality Standards
The project follows strict coding standards enforced by ESLint and TypeScript:

- **No `any` types** - Explicit typing required
- **Function return types** - All functions must declare return types
- **Props interfaces** - All React components must have typed props
- **No inline functions** - Use useCallback for event handlers
- **Proper cleanup** - useEffect hooks must include cleanup functions

### Custom Hooks
- **`useGuildData`**: Centralized guild data fetching
- **`useTheme`**: Theme management and persistence
- **Type-safe hooks**: Strongly typed Redux hooks

### State Management
- **Redux Toolkit**: Modern Redux with less boilerplate
- **RTK Query**: Automatic caching and background refetching
- **Normalized State**: Efficient data structure for guild members

### Performance Optimization
- **React.memo**: Prevent unnecessary re-renders
- **useMemo/useCallback**: Optimize expensive calculations
- **Code Splitting**: Dynamic imports for route components
- **Image Optimization**: Properly sized and compressed assets

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Environment Variables
Ensure all required environment variables are set in your deployment environment:
- Guild configuration (name, realm, region)
- API credentials (WarcraftLogs, Blizzard)
- Any custom settings

### Deployment Platforms
The application can be deployed to:
- **Vercel** (recommended for React apps)
- **Netlify** (with build settings)
- **GitHub Pages** (static hosting)
- **AWS S3 + CloudFront** (scalable option)

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Code Style
- Follow the existing TypeScript and React patterns
- Use the established naming conventions
- Write comprehensive type definitions
- Include proper error handling

### Pull Request Process
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Write tests for new features
- Update documentation as needed
- Follow the established file structure
- Use semantic commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

### Upcoming Features
- [ ] Calendar integration for raid scheduling
- [ ] DKP (Dragon Kill Points) tracking system
- [ ] Member application system
- [ ] Discord bot integration
- [ ] Advanced analytics dashboard
- [ ] Mobile app with React Native

### Performance Improvements
- [ ] Service worker for offline functionality
- [ ] Advanced caching strategies
- [ ] Image lazy loading
- [ ] Bundle optimization

## 🙏 Acknowledgments

- **WarcraftLogs** - For providing comprehensive combat log analysis
- **Blizzard Entertainment** - For the World of Warcraft API
- **React Team** - For the amazing React ecosystem
- **Tailwind CSS** - For the utility-first CSS framework
- **Guild Members** - For inspiration and feedback

## 📞 Support

For questions, bug reports, or feature requests:
- Create an issue on GitHub
- Join our Discord server
- Email the development team

---

*Made with ❤️ and 🍺 by the Nose Beers But No Gear guild*
