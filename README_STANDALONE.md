# MTG Combo Finder - Standalone Version

## 🚀 Quick Start

**Just double-click `START_APP.bat`** and the app will open in your browser!

No installation, no npm, no setup required.

## 📁 What's Included

```
ComboChecker/
├── dist/                    # The standalone app (ready to use!)
│   ├── index.html          # Main app file
│   └── assets/             # CSS and JavaScript
├── START_APP.bat           # Double-click to launch
└── INSTRUCTIONS.txt        # Full instructions
```

## 🌐 Internet Required

The app needs internet to:
- Fetch combo data from Commander Spellbook API
- Load card images from Scryfall

The HTML/CSS/JS files work offline, but you need a connection for the actual data.

## 💡 Alternative Launch Methods

### Method 1: Batch File (Easiest)
```
Double-click: START_APP.bat
```

### Method 2: Direct File
```
Navigate to: dist/
Double-click: index.html
```

### Method 3: Local Server (Optional)
If you have Python installed:
```bash
cd dist
python -m http.server 8000
# Open: http://localhost:8000
```

## ✨ Features

- 🔍 Search 68,000+ validated combos
- 🎨 Filter by color identity (W, U, B, R, G, C)
- 🎮 Filter by format (Commander, Modern, Legacy, etc.)
- 🖼️ **Hover over card names to preview them!**
- 📋 Click combos for step-by-step breakdowns
- 📊 See how popular each combo is
- 📱 Works on desktop and mobile

## 🔄 Updating the App

To rebuild the standalone version:
```bash
npm run build
```

The new version will be in the `dist/` folder.

## 🛠️ Development Mode

If you want to develop/modify the app:
```bash
npm install
npm run dev
```

## 📦 Sharing the App

To share with friends:
1. Zip the entire `ComboChecker` folder, OR
2. Just zip the `dist` folder (smallest option)
3. Recipients can open `index.html` directly

## 🐛 Troubleshooting

**App won't open?**
- Make sure you have internet connection
- Try a different browser (Chrome, Firefox, Edge)
- Check browser console for errors (F12)

**Card images not loading?**
- Check internet connection
- Scryfall API might be down (rare)
- Try refreshing the page

**No combos showing?**
- Commander Spellbook API might be down
- Check console for error messages
- Wait a few seconds and refresh

## 📝 Technical Details

Built with modern web technologies:
- React 18 (compiled to vanilla JS)
- TypeScript (compiled to JavaScript)
- Commander Spellbook API
- Scryfall API for card images
- Pure CSS styling

The build process creates optimized, minified files that work in any modern browser.

## 🎯 Data Source

All combo data comes from [Commander Spellbook](https://commanderspellbook.com/), 
a community-driven database of MTG combos. Card images are from [Scryfall](https://scryfall.com/).

## 🎉 Enjoy!

Happy combo hunting! May you always have the perfect 2-card combo in hand. ⚔️
