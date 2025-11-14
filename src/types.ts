export type ColorIdentity = 'W' | 'U' | 'B' | 'R' | 'G' | 'C';

export interface SpellbookCard {
  id: number;
  name: string;
  oracleId: string;
  imageUriFrontNormal?: string;
  imageUriFrontLarge?: string;
}

export interface SpellbookCardUse {
  card: SpellbookCard;
  quantity: number;
  zoneLocations: string[];
}

export interface SpellbookFeature {
  id: number;
  name: string;
  status?: string;
  uncountable?: boolean;
}

export interface SpellbookProduces {
  feature: SpellbookFeature;
  quantity: number;
}

export interface SpellbookLegalities {
  commander: boolean;
  modern: boolean;
  legacy: boolean;
  vintage: boolean;
  standard: boolean;
  pioneer: boolean;
  brawl: boolean;
  oathbreaker: boolean;
  pauper: boolean;
}

export interface SpellbookVariant {
  id: string;
  description: string;
  manaNeeded: string;
  identity: string;
  uses: SpellbookCardUse[];
  produces: SpellbookProduces[];
  legalities: SpellbookLegalities;
  popularity: number;
  prices?: {
    tcgplayer: string;
    cardmarket: string;
    cardkingdom: string;
  };
}

export interface SpellbookResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SpellbookVariant[];
}
