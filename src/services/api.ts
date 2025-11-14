import { SpellbookResponse, SpellbookVariant } from '../types';

const API_BASE = 'https://backend.commanderspellbook.com';

export async function fetchCombos(
  limit: number = 100,
  offset: number = 0
): Promise<SpellbookResponse> {
  try {
    // Try to load from local cache first
    const response = await fetch('/combos.json');
    if (response.ok) {
      const data = await response.json();
      // Apply limit and offset to cached data
      return {
        ...data,
        results: data.results.slice(offset, offset + limit)
      };
    }
  } catch (err) {
    console.warn('Failed to load local combos cache, falling back to API');
  }
  
  // Fallback to API if cache not available
  const response = await fetch(`${API_BASE}/variants/?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    throw new Error('Failed to fetch combos');
  }
  return response.json();
}

export async function searchCombos(
  query: string,
  colorIdentity?: string[],
  formats?: string[]
): Promise<SpellbookVariant[]> {
  let url = `${API_BASE}/variants/?limit=100`;
  
  if (query) {
    url += `&q=${encodeURIComponent(query)}`;
  }
  
  if (colorIdentity && colorIdentity.length > 0) {
    const colors = colorIdentity.join('');
    url += `&ci=${colors}`;
  }
  
  if (formats && formats.length > 0) {
    formats.forEach(format => {
      url += `&legal=${format.toLowerCase()}`;
    });
  }
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to search combos');
  }
  const data: SpellbookResponse = await response.json();
  return data.results;
}

export async function validateCards(cardNames: string[]): Promise<boolean> {
  try {
    const promises = cardNames.map(name =>
      fetch(`https://api.scryfall.com/cards/named?exact=${encodeURIComponent(name)}`)
    );
    const responses = await Promise.all(promises);
    return responses.every(r => r.ok);
  } catch {
    return false;
  }
}

export async function getCardColorIdentity(cardName: string): Promise<string[]> {
  try {
    const response = await fetch(`https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName)}`);
    if (!response.ok) {
      throw new Error('Card not found');
    }
    const data = await response.json();
    return data.color_identity || [];
  } catch (err) {
    console.error(`Failed to fetch color identity for ${cardName}:`, err);
    return [];
  }
}
