# MTG Combo Finder

A modern web application for searching, filtering, and browsing Magic: The Gathering card combos, powered by Commander Spellbook API.

## Features

- 🔍 **Search Functionality**: Search combos by card name, effect, or keyword
- 🎨 **Color Identity Filters**: Filter by color combinations (W, U, B, R, G, C)
- 🎮 **Format Filters**: Filter by format (Commander, Modern, Legacy, Standard, Pioneer, Vintage)
- 🖼️ **Card Images**: Displays MTG card images from Scryfall API
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 📋 **Combo Details**: Click any combo to see detailed steps, required mana, and card images
- ✨ **Modern UI**: Clean, dark-themed interface with smooth animations
- 🎯 **Real Data**: 68,000+ validated combos from Commander Spellbook database
- 📊 **Popularity Metrics**: See how many decks use each combo

## Tech Stack

- React 18 + TypeScript
- Vite (build tool)
- Commander Spellbook API (combo data)
- Scryfall API (card images)
- CSS3 (no external CSS frameworks)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── ComboCard.tsx       # Individual combo card component
│   ├── ComboModal.tsx      # Detailed combo view modal
│   └── FilterPanel.tsx     # Filters sidebar
├── data/
│   └── combos.ts           # Sample combo data
├── types.ts                # TypeScript type definitions
├── App.tsx                 # Main app component
├── App.css                 # Global styles
└── main.tsx                # App entry point
```

## Data Source

This app fetches live combo data from the [Commander Spellbook API](https://backend.commanderspellbook.com/). All combos are community-validated and updated regularly.

### API Endpoints Used

- `GET /variants/` - Fetch combo data
- Query parameters support filtering by:
  - Color identity (`ci`)
  - Format legality (`legal`)
  - Search terms (`q`)

## Future Enhancements

- User submission form for new combos
- Persistent storage (localStorage or backend)
- Advanced filtering (CMC, combo type, etc.)
- Export combos to deck lists
- User accounts and favorites
