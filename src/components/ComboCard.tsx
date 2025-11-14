import { SpellbookVariant } from '../types';

interface ComboCardProps {
  combo: SpellbookVariant;
  onClick: () => void;
  onCardHover: (cardName: string, x: number, y: number) => void;
  onCardLeave: () => void;
}

function parseManaSymbols(mana: string) {
  if (!mana) return null;
  
  const parts: JSX.Element[] = [];
  let i = 0;
  
  while (i < mana.length) {
    if (mana[i] === '{') {
      const end = mana.indexOf('}', i);
      if (end !== -1) {
        const symbol = mana.substring(i + 1, end).toLowerCase();
        parts.push(<i key={i} className={`ms ms-${symbol} ms-cost`}></i>);
        i = end + 1;
      } else {
        i++;
      }
    } else {
      const char = mana[i];
      if (char.match(/[WUBRGC]/i)) {
        parts.push(<i key={i} className={`ms ms-${char.toLowerCase()} ms-cost`}></i>);
      } else if (char.match(/\d/)) {
        parts.push(<i key={i} className={`ms ms-${char} ms-cost`}></i>);
      }
      i++;
    }
  }
  
  return <>{parts}</>;
}

export function ComboCard({ combo, onClick, onCardHover, onCardLeave }: ComboCardProps) {
  const getComboName = () => {
    const cardNames = combo.uses.map(u => u.card.name).join(' + ');
    return cardNames || 'Unnamed Combo';
  };

  const getMainResult = () => {
    if (combo.produces.length > 0) {
      return combo.produces[0].feature.name;
    }
    return 'Various effects';
  };

  const handleMouseEnter = (e: React.MouseEvent, cardName: string) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    onCardHover(cardName, rect.right, rect.top);
  };

  return (
    <div className="combo-card" onClick={onClick}>
      <h3>{getComboName()}</h3>
      <div className="combo-cards-list">
        {combo.uses.map((use, idx) => (
          <div key={idx}>
            • <span
              className="card-name-hover"
              onMouseEnter={(e) => handleMouseEnter(e, use.card.name)}
              onMouseLeave={onCardLeave}
            >
              {use.card.name}
            </span>
            {use.quantity > 1 && ` (x${use.quantity})`}
          </div>
        ))}
      </div>
      <div className="combo-tags">
        {combo.manaNeeded && <span className="tag mana-tag">{parseManaSymbols(combo.manaNeeded)}</span>}
        <span className="tag color-identity-tag">
          {combo.identity.split('').map((color, idx) => (
            <i key={idx} className={`ms ms-${color.toLowerCase()} ms-cost`}></i>
          ))}
          {combo.identity === '' && <i className="ms ms-c ms-cost"></i>}
        </span>
      </div>
      <p className="combo-description">
        {getMainResult()}
      </p>
    </div>
  );
}
