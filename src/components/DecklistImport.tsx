import { useState } from 'react';

interface DecklistImportProps {
  onImport: (decklist: string) => void;
  onClear: () => void;
  hasDecklist: boolean;
  deckName?: string;
  comboCount?: number;
}

export function DecklistImport({ onImport, onClear, hasDecklist, deckName, comboCount }: DecklistImportProps) {
  const [decklistText, setDecklistText] = useState('');
  const [showImport, setShowImport] = useState(!hasDecklist);

  const handleImport = () => {
    if (decklistText.trim()) {
      onImport(decklistText);
      setShowImport(false);
    }
  };

  const handleClear = () => {
    setDecklistText('');
    onClear();
    setShowImport(true);
  };

  const handleShowImport = () => {
    setDecklistText('');
    setShowImport(true);
  };

  const exampleDecklist = `Commander:
Thassa's Oracle

Deck:
1 Demonic Consultation
1 Tainted Pact
1 Sol Ring
1 Mana Vault
1 Basalt Monolith
1 Dramatic Reversal
1 Isochron Scepter
1 Exquisite Blood
1 Sanguine Bond`;

  if (!showImport && hasDecklist) {
    return (
      <div className="decklist-banner">
        <div className="decklist-banner-content">
          <span className="banner-icon">✓</span>
          <div className="banner-info">
            <strong>{deckName || 'Decklist loaded'}</strong>
            {comboCount !== undefined && (
              <span className="combo-count">{comboCount} combo{comboCount !== 1 ? 's' : ''} found</span>
            )}
          </div>
          <div className="decklist-banner-actions">
            <button onClick={handleShowImport} className="btn-secondary-small">
              Import Different Deck
            </button>
            <button onClick={handleClear} className="btn-secondary-small">
              Browse All Combos
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="decklist-import">
      <div className="import-header">
        <h2>🎴 Find Combos in Your Deck</h2>
        <p>Copy your decklist from Moxfield or Archidekt and paste below!</p>
      </div>

      <div className="how-to-export">
        <div className="export-method">
          <strong>From Moxfield:</strong>
          <ol>
            <li>Open your deck on Moxfield</li>
            <li>Click the <strong>Export</strong> button (top right)</li>
            <li>Choose <strong>"Text"</strong> or <strong>"MTGO"</strong></li>
            <li>Click <strong>Copy to Clipboard</strong></li>
            <li>Paste below!</li>
          </ol>
        </div>
        <div className="export-method">
          <strong>From Archidekt:</strong>
          <ol>
            <li>Open your deck on Archidekt</li>
            <li>Click <strong>Export</strong></li>
            <li>Choose <strong>"Text"</strong></li>
            <li>Copy the text</li>
            <li>Paste below!</li>
          </ol>
        </div>
      </div>

      <textarea
        className="decklist-textarea"
        value={decklistText}
        onChange={(e) => setDecklistText(e.target.value)}
        placeholder={exampleDecklist}
        rows={15}
      />

      <div className="text-help">
        <h4>✓ Supports All Formats:</h4>
        <ul>
          <li>Moxfield exports (Text or MTGO)</li>
          <li>Archidekt exports (Text)</li>
          <li>MTGO format (1 Card Name)</li>
          <li>Arena format (1 Card Name (SET) 123)</li>
          <li>Plain text (one card per line)</li>
          <li>Any format with card names!</li>
        </ul>
      </div>

      <div className="import-actions">
        <button 
          onClick={handleImport} 
          className="btn-primary" 
          disabled={!decklistText.trim()}
        >
          Find Combos in My Deck
        </button>
        {hasDecklist && (
          <button onClick={handleClear} className="btn-secondary">
            Browse All Combos Instead
          </button>
        )}
      </div>
    </div>
  );
}
