export interface ParsedDeck {
  cards: string[];
  commanders: string[];
  deckName?: string;
}

// Parse Moxfield deck from URL using CORS proxy
export async function fetchMoxfieldDeck(url: string): Promise<ParsedDeck> {
  const deckId = extractMoxfieldId(url);
  if (!deckId) throw new Error('Invalid Moxfield URL');
  
  // Use CORS proxy to bypass CORS restrictions
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api2.moxfield.com/v2/decks/all/${deckId}`)}`;
  
  const response = await fetch(proxyUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch Moxfield deck. Make sure the deck is public!');
  }
  
  const data = await response.json();
  const cards: string[] = [];
  const commanders: string[] = [];
  
  // Get commanders
  if (data.commanders) {
    for (const card of Object.values(data.commanders) as any[]) {
      commanders.push(card.card.name);
      cards.push(card.card.name);
    }
  }
  
  // Get main deck cards
  if (data.mainboard) {
    for (const card of Object.values(data.mainboard) as any[]) {
      const quantity = card.quantity || 1;
      for (let i = 0; i < quantity; i++) {
        cards.push(card.card.name);
      }
    }
  }
  
  return { cards, commanders, deckName: data.name };
}

// Parse Archidekt deck from URL using CORS proxy
export async function fetchArchidektDeck(url: string): Promise<ParsedDeck> {
  const deckId = extractArchidektId(url);
  if (!deckId) throw new Error('Invalid Archidekt URL');
  
  // Use CORS proxy to bypass CORS restrictions
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://archidekt.com/api/decks/${deckId}/`)}`;
  
  const response = await fetch(proxyUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch Archidekt deck. Make sure the deck is public!');
  }
  
  const data = await response.json();
  const cards: string[] = [];
  const commanders: string[] = [];
  
  if (data.cards) {
    for (const card of data.cards) {
      const cardName = card.card.oracleCard.name;
      const quantity = card.quantity || 1;
      
      // Check if it's a commander
      if (card.categories && card.categories.includes('Commander')) {
        commanders.push(cardName);
      }
      
      for (let i = 0; i < quantity; i++) {
        cards.push(cardName);
      }
    }
  }
  
  return { cards, commanders, deckName: data.name };
}

function extractMoxfieldId(url: string): string | null {
  // Match Moxfield URLs like: https://moxfield.com/decks/xWMsjrZyZk-S0yqrLt2jBg
  const match = url.match(/moxfield\.com\/decks\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

function extractArchidektId(url: string): string | null {
  const match = url.match(/archidekt\.com\/decks\/(\d+)/);
  return match ? match[1] : null;
}

// Parse text decklist
export function parseDecklist(decklistText: string): ParsedDeck {
  const cards: string[] = [];
  const commanders: string[] = [];
  
  const lines = decklistText.split('\n');
  let inCommanderSection = false;
  
  for (let line of lines) {
    line = line.trim();
    
    // Skip empty lines and comments
    if (!line || line.startsWith('//') || line.startsWith('#')) {
      continue;
    }
    
    // Check for commander section markers
    if (line.toLowerCase().match(/^(commander|commanders):/)) {
      inCommanderSection = true;
      continue;
    }
    
    // Check for other section markers (end commander section)
    if (line.toLowerCase().match(/^(deck|mainboard|main|creature|instant|sorcery|artifact|enchantment|planeswalker|land|sideboard):/)) {
      inCommanderSection = false;
    }
    
    // Parse card line
    const parsed = extractCardName(line);
    if (parsed) {
      const { name, quantity } = parsed;
      
      if (inCommanderSection) {
        commanders.push(name);
      }
      
      // Add card multiple times if quantity > 1
      for (let i = 0; i < quantity; i++) {
        cards.push(name);
      }
    }
  }
  
  return { cards, commanders };
}

function extractCardName(line: string): { name: string; quantity: number } | null {
  // Extract quantity at start (e.g., "1x", "4 ", "1 ")
  let quantity = 1;
  const quantityMatch = line.match(/^(\d+)x?\s+/i);
  if (quantityMatch) {
    quantity = parseInt(quantityMatch[1]);
    line = line.replace(/^\d+x?\s+/i, '');
  }
  
  // Remove set codes and collector numbers (e.g., "[STX]", "(CMR)", "123")
  line = line.replace(/\[[A-Z0-9]+\]/g, '');
  line = line.replace(/\([A-Z0-9]+\)\s*\d*/g, '');
  line = line.replace(/\s+\d+\s*$/, '');
  
  // Remove foil markers and other suffixes
  line = line.replace(/\*CMDR\*/i, '');
  line = line.replace(/\(Commander\)/i, '');
  line = line.replace(/\*F\*/i, '');
  line = line.replace(/\s+\(Foil\)/i, '');
  
  line = line.trim();
  
  // If empty after cleaning, return null
  if (!line || line.length < 2) {
    return null;
  }
  
  return { name: line, quantity };
}

export function normalizeCardName(name: string): string {
  return name.toLowerCase().trim().replace(/[^a-z0-9\s]/g, '');
}

export function findCombosInDeck(deckCards: string[], allCombos: any[]): {
  foundCombos: any[];
  almostCombos: Array<{ combo: any; missingCards: string[] }>;
} {
  const normalizedDeck = deckCards.map(normalizeCardName);
  const foundCombos: any[] = [];
  const almostCombos: Array<{ combo: any; missingCards: string[] }> = [];
  
  for (const combo of allCombos) {
    const comboCardNames = combo.uses.map((use: any) => use.card.name);
    const missingCards: string[] = [];
    
    for (const comboCard of comboCardNames) {
      const normalized = normalizeCardName(comboCard);
      if (!normalizedDeck.includes(normalized)) {
        missingCards.push(comboCard);
      }
    }
    
    if (missingCards.length === 0) {
      foundCombos.push(combo);
    } else if (missingCards.length === 1) {
      almostCombos.push({ combo, missingCards });
    }
  }
  
  return { foundCombos, almostCombos };
}
