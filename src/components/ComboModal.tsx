import { useState } from 'react';
import { SpellbookVariant } from '../types';
import { CardPreview } from './CardPreview';

interface ComboModalProps {
  combo: SpellbookVariant;
  onClose: () => void;
}

function parseManaSymbols(mana: string) {
  if (!mana) return <span style={{ color: '#9ca3af' }}>Variable</span>;
  
  const parts: JSX.Element[] = [];
  let i = 0;
  
  while (i < mana.length) {
    if (mana[i] === '{') {
      const end = mana.indexOf('}', i);
      if (end !== -1) {
        const symbol = mana.substring(i + 1, end).toLowerCase();
        parts.push(<i key={i} className={`ms ms-${symbol} ms-cost ms-2x`}></i>);
        i = end + 1;
      } else {
        i++;
      }
    } else {
      const char = mana[i];
      if (char.match(/[WUBRGC]/i)) {
        parts.push(<i key={i} className={`ms ms-${char.toLowerCase()} ms-cost ms-2x`}></i>);
      } else if (char.match(/\d/)) {
        parts.push(<i key={i} className={`ms ms-${char} ms-cost ms-2x`}></i>);
      }
      i++;
    }
  }
  
  return <span style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>{parts}</span>;
}

export function ComboModal({ combo, onClose }: ComboModalProps) {
  const [hoveredCard, setHoveredCard] = useState<{ name: string; x: number; y: number } | null>(null);
  const getComboName = () => {
    const cardNames = combo.uses.map(u => u.card.name).join(' + ');
    return cardNames || 'Unnamed Combo';
  };

  const getLegalFormats = () => {
    const formats: string[] = [];
    if (combo.legalities.commander) formats.push('Commander');
    if (combo.legalities.modern) formats.push('Modern');
    if (combo.legalities.legacy) formats.push('Legacy');
    if (combo.legalities.vintage) formats.push('Vintage');
    if (combo.legalities.standard) formats.push('Standard');
    if (combo.legalities.pioneer) formats.push('Pioneer');
    if (combo.legalities.brawl) formats.push('Brawl');
    if (combo.legalities.oathbreaker) formats.push('Oathbreaker');
    return formats.length > 0 ? formats.join(', ') : 'None';
  };

  const getSteps = () => {
    return combo.description.split('\n').filter(line => line.trim());
  };

  const handleCardHover = (e: React.MouseEvent, cardName: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredCard({ name: cardName, x: rect.right, y: rect.top });
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{getComboName()}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="card-images">
            {combo.uses.map(use => (
              use.card.imageUriFrontNormal && (
                <img
                  key={use.card.id}
                  src={use.card.imageUriFrontNormal}
                  alt={use.card.name}
                  className="card-image"
                />
              )
            ))}
          </div>
          <div className="combo-info">
            <h3>Cards Required</h3>
            {combo.uses.map((use, idx) => (
              <p key={idx}>
                • <span
                  className="card-name-hover"
                  onMouseEnter={(e) => handleCardHover(e, use.card.name)}
                  onMouseLeave={handleCardLeave}
                >
                  {use.card.name}
                </span>
                {use.quantity > 1 && ` (x${use.quantity})`}
              </p>
            ))}

            <h3>Required Mana</h3>
            <p>{parseManaSymbols(combo.manaNeeded)}</p>

            <h3>Color Identity</h3>
            <p style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
              {combo.identity ? combo.identity.split('').map((color, idx) => (
                <i key={idx} className={`ms ms-${color.toLowerCase()} ms-cost ms-2x`}></i>
              )) : (
                <i className="ms ms-c ms-cost ms-2x"></i>
              )}
            </p>

            <h3>Legal Formats</h3>
            <p>{getLegalFormats()}</p>

            <h3>How it Works</h3>
            <ol>
              {getSteps().map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>

            <h3>Results</h3>
            <div className="result">
              {combo.produces.map((produce, idx) => (
                <div key={idx}>
                  <strong>• {produce.feature.name}</strong>
                </div>
              ))}
            </div>

            {combo.popularity && (
              <>
                <h3>Popularity</h3>
                <p>{combo.popularity.toLocaleString()} decks</p>
              </>
            )}
          </div>
        </div>
      </div>

      {hoveredCard && (
        <CardPreview
          cardName={hoveredCard.name}
          position={{ x: hoveredCard.x, y: hoveredCard.y }}
        />
      )}
    </div>
  );
}
