# 🎴 Decklist Import Guide

Your MTG Combo Finder now finds combos **in YOUR deck**!

## 🚀 Quick Start

1. Run `EASY_START.bat`
2. Click **"Import from URL"** or **"Paste Decklist"**
3. Enter your deck information
4. Click **"Find Combos in My Deck"**

Done! The app will show you all combos available with your cards.

---

## 📥 Import Methods

### Method 1: Import from URL (Easiest!)

**Supported Sites:**
- ✅ **Moxfield** - `https://moxfield.com/decks/YOUR_DECK_ID`
- ✅ **Archidekt** - `https://archidekt.com/decks/123456`

**Steps:**
1. Go to your deck on Moxfield or Archidekt
2. Copy the URL from your browser (the full address bar)
3. Paste it into the app
4. Click "Find Combos in My Deck"

**Example URLs:**
```
https://moxfield.com/decks/xWMsjrZyZk-S0yqrLt2jBg
https://archidekt.com/decks/5678901
```

---

### Method 2: Paste Decklist (Text)

**Supported Formats:**

#### MTGO Format
```
Commander:
1 Thassa's Oracle

Deck:
1 Demonic Consultation
1 Tainted Pact
1 Sol Ring
```

#### Arena Format
```
1 Thassa's Oracle (THB) 73
1 Demonic Consultation (ICE) 124
1 Sol Ring (C21) 263
```

#### Simple List
```
Thassa's Oracle
Demonic Consultation
Tainted Pact
Sol Ring
```

#### Moxfield Export
```
Commander:
1x Thassa's Oracle

Main:
1x Demonic Consultation
1x Tainted Pact
```

**All formats work!** The app automatically strips:
- Quantities (1x, 4x)
- Set codes ([THB], (ICE))
- Collector numbers
- Foil markers (*F*)

---

## ✨ Features

### 1. **Found Combos**
Shows all complete combos you can execute with your current decklist.

### 2. **Almost Combos** ⚠️
Shows combos missing just **1 card**! Great for:
- Finding upgrades for your deck
- Discovering hidden synergies
- Planning future additions

### 3. **Filters Still Work**
Even with a decklist loaded, you can:
- Search for specific cards
- Filter by color identity
- Filter by format legality

### 4. **Card Hover Previews**
Hover over any card name to see the actual card image!

---

## 💡 Tips

### Get More Combos
1. Look at the "Almost There" section
2. Add the missing card to your deck
3. Re-import to see new combos!

### Optimize Your Deck
- See which cards enable the most combos
- Find redundant combo pieces
- Identify key combo enablers

### Share Results
- Export combo list (coming soon!)
- Share with playgroup
- Test in proxies before buying

---

## 🔄 Updating Your Deck

**Made changes to your deck?**

1. Update it on Moxfield/Archidekt
2. Click "Import Different Deck" in the app
3. Paste the same URL again
4. New combos will be found!

**OR**

1. Click "Browse All Combos"
2. Re-import with updated decklist

---

## 🐛 Troubleshooting

### "Failed to fetch Moxfield deck"
- Make sure your deck is **public** on Moxfield
- Check that the URL is correct
- Try copying the URL again

### "Failed to fetch Archidekt deck"
- Deck must be **public** or **unlisted**
- Private decks won't work
- Check the deck ID in the URL

### "No combos found"
- Your deck might not have any 2-card combos
- Check the "Almost There" section for near-misses
- Try adding more combo pieces

### Card names not matching
- Use official card names
- Check for typos
- Double-faced cards use front face name

---

## 📊 Example Workflow

1. **Import your cEDH deck** from Moxfield
2. See you have **15 combos** in the deck
3. Notice "Almost There" shows **8 more** with 1 card missing
4. Add `Dramatic Reversal` to unlock 3 new combos
5. Update deck on Moxfield
6. Re-import to see the new combos!

---

## 🎯 Coming Soon

- [ ] Manabase analysis
- [ ] Combo category grouping
- [ ] Export combo list
- [ ] Deck statistics
- [ ] Card overlap analysis
- [ ] Combo redundancy checker

---

Enjoy finding combos in your deck! ⚔️
