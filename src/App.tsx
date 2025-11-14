import { useState, useEffect, useMemo } from 'react';
import { ComboCard } from './components/ComboCard';
import { ComboModal } from './components/ComboModal';
import { FilterPanel } from './components/FilterPanel';
import { CardPreview } from './components/CardPreview';
import { DecklistImport } from './components/DecklistImport';
import { fetchCombos } from './services/api';
import { parseDecklist, findCombosInDeck } from './utils/decklistParser';
import { SpellbookVariant, ColorIdentity } from './types';
import './App.css';

type Format = 'Commander' | 'Modern' | 'Legacy' | 'Standard' | 'Pioneer' | 'Vintage';

function App() {
  const [allCombos, setAllCombos] = useState<SpellbookVariant[]>([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColors, setSelectedColors] = useState<ColorIdentity[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<Format[]>([]);
  const [selectedCombo, setSelectedCombo] = useState<SpellbookVariant | null>(null);
  const [hoveredCard, setHoveredCard] = useState<{ name: string; x: number; y: number } | null>(null);
  
  const [deckCards, setDeckCards] = useState<string[]>([]);
  const [deckName, setDeckName] = useState<string>('');
  const [foundCombos, setFoundCombos] = useState<SpellbookVariant[]>([]);
  const [almostCombos, setAlmostCombos] = useState<Array<{ combo: SpellbookVariant; missingCards: string[] }>>([]);

  useEffect(() => {
    async function loadCombos() {
      try {
        setLoading(true);
        const data = await fetchCombos(1000, 0);
        setAllCombos(data.results);
        setError(null);
      } catch (err) {
        setError('Failed to load combos. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadCombos();
  }, []);

  const handleImportDecklist = async (input: string) => {
    setImporting(true);
    setError(null);
    
    try {
      const parsedDeck = parseDecklist(input);
      
      setDeckCards(parsedDeck.cards);
      setDeckName(parsedDeck.deckName || 'Your Deck');
      
      console.log(`Analyzing ${parsedDeck.cards.length} cards against ${allCombos.length} combos...`);
      const { foundCombos: found, almostCombos: almost } = findCombosInDeck(parsedDeck.cards, allCombos);
      console.log(`Found ${found.length} complete combos and ${almost.length} almost-combos`);
      
      setFoundCombos(found);
      setAlmostCombos(almost);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to import decklist';
      setError(errorMessage);
      console.error('Import error:', err);
      alert(`Error: ${errorMessage}`);
    } finally {
      setImporting(false);
    }
  };

  const handleClearDecklist = () => {
    setDeckCards([]);
    setDeckName('');
    setFoundCombos([]);
    setAlmostCombos([]);
  };

  const displayCombos = deckCards.length > 0 ? foundCombos : allCombos;

  const filteredCombos = useMemo(() => {
    return displayCombos.filter(combo => {
      const matchesSearch = searchTerm === '' || 
        combo.uses.some(use => use.card.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        combo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        combo.produces.some(p => p.feature.name.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesColor = selectedColors.length === 0 ||
        selectedColors.every(color => combo.identity.includes(color));

      const matchesFormat = selectedFormats.length === 0 ||
        selectedFormats.some(format => {
          const formatKey = format.toLowerCase() as keyof typeof combo.legalities;
          return combo.legalities[formatKey];
        });

      return matchesSearch && matchesColor && matchesFormat;
    });
  }, [displayCombos, searchTerm, selectedColors, selectedFormats]);

  const toggleColor = (color: ColorIdentity) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const toggleFormat = (format: Format) => {
    setSelectedFormats(prev =>
      prev.includes(format) ? prev.filter(f => f !== format) : [...prev, format]
    );
  };

  const handleCardHover = (cardName: string, x: number, y: number) => {
    setHoveredCard({ name: cardName, x, y });
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  if (loading) {
    return (
      <div className="app">
        <header className="header">
          <h1>⚔️ MTG Combo Finder</h1>
        </header>
        <div style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af' }}>
          <p>Loading combo database from Commander Spellbook...</p>
          <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>This may take a moment...</p>
        </div>
      </div>
    );
  }

  if (importing) {
    return (
      <div className="app">
        <header className="header">
          <h1>⚔️ MTG Combo Finder</h1>
        </header>
        <div style={{ padding: '2rem', textAlign: 'center', color: '#f59e0b' }}>
          <p>Importing your decklist and finding combos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <header className="header">
          <h1>⚔️ MTG Combo Finder</h1>
        </header>
        <div style={{ padding: '2rem', textAlign: 'center', color: '#ef4444' }}>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>⚔️ MTG Combo Finder</h1>
        {deckCards.length > 0 && (
          <input
            type="text"
            className="search-bar"
            placeholder="Search combos by card name, effect, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}
      </header>

      <DecklistImport
        onImport={handleImportDecklist}
        onClear={handleClearDecklist}
        hasDecklist={deckCards.length > 0}
        deckName={deckName}
        comboCount={foundCombos.length}
      />

      {deckCards.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af' }}>
          <p>Import your decklist above to find all available combos in your deck!</p>
        </div>
      ) : (
        <>
          <div className="main-content">
        <FilterPanel
          selectedColors={selectedColors}
          selectedFormats={selectedFormats}
          onColorToggle={toggleColor}
          onFormatToggle={toggleFormat}
        />

        <div className="combo-grid">
          {filteredCombos.length === 0 ? (
            <p style={{ color: '#9ca3af', gridColumn: '1 / -1' }}>
              No combos found matching your criteria.
            </p>
          ) : (
            filteredCombos.map(combo => (
              <ComboCard
                key={combo.id}
                combo={combo}
                onClick={() => setSelectedCombo(combo)}
                onCardHover={handleCardHover}
                onCardLeave={handleCardLeave}
              />
            ))
          )}
          </div>
        </div>

        {almostCombos.length > 0 && (
          <div className="almost-combos-section">
            <h3>⚠️ Almost There! ({almostCombos.length} combos missing 1 card)</h3>
            <p>Add one of these cards to unlock more combos:</p>
            <div className="combo-grid">
              {almostCombos.slice(0, 6).map(({ combo, missingCards }) => (
                <div key={combo.id} className="combo-card" onClick={() => setSelectedCombo(combo)}>
                  <h3>{combo.uses.map(u => u.card.name).join(' + ')}</h3>
                  <p style={{ color: '#f59e0b', marginTop: '0.5rem' }}>
                    Missing: <span className="missing-card">{missingCards[0]}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </>
      )}

      {selectedCombo && (
        <ComboModal
          combo={selectedCombo}
          onClose={() => setSelectedCombo(null)}
        />
      )}

      {hoveredCard && (
        <CardPreview
          cardName={hoveredCard.name}
          position={{ x: hoveredCard.x, y: hoveredCard.y }}
        />
      )}
    </div>
  );
}

export default App;
