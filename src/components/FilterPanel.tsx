import { useState } from 'react';
import { ColorIdentity } from '../types';

type Format = 'Commander' | 'Modern' | 'Legacy' | 'Standard' | 'Pioneer' | 'Vintage';

interface FilterPanelProps {
  selectedColors: ColorIdentity[];
  selectedFormats: Format[];
  onColorToggle: (color: ColorIdentity) => void;
  onFormatToggle: (format: Format) => void;
}

const COLORS: ColorIdentity[] = ['W', 'U', 'B', 'R', 'G', 'C'];
const FORMATS: Format[] = ['Commander', 'Modern', 'Legacy', 'Standard', 'Pioneer', 'Vintage'];

function getColorSymbol(color: ColorIdentity): string {
  const symbols: Record<ColorIdentity, string> = {
    W: 'w',
    U: 'u',
    B: 'b',
    R: 'r',
    G: 'g',
    C: 'c'
  };
  return symbols[color];
}

function getColorName(color: ColorIdentity): string {
  const names: Record<ColorIdentity, string> = {
    W: 'White',
    U: 'Blue',
    B: 'Black',
    R: 'Red',
    G: 'Green',
    C: 'Colorless'
  };
  return names[color];
}

export function FilterPanel({ selectedColors, selectedFormats, onColorToggle, onFormatToggle }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="filter-panel">
      <button className="filter-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Hide Filters' : 'Show Filters'}
      </button>
      
      <div className={`filter-content ${isOpen ? 'open' : ''}`}>
        <div className="filter-section">
          <h3>Color Identity</h3>
          <div className="color-filters">
            {COLORS.map(color => (
              <button
                key={color}
                className={`color-btn ${selectedColors.includes(color) ? 'active' : ''}`}
                onClick={() => onColorToggle(color)}
                title={getColorName(color)}
              >
                <i className={`ms ms-${getColorSymbol(color)} ms-2x ms-cost`}></i>
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h3>Formats</h3>
          <div className="format-filters">
            {FORMATS.map(format => (
              <label key={format} className="format-checkbox">
                <input
                  type="checkbox"
                  checked={selectedFormats.includes(format)}
                  onChange={() => onFormatToggle(format)}
                />
                {format}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
