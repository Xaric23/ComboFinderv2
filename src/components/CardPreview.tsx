import { useState, useEffect } from 'react';

interface CardPreviewProps {
  cardName: string;
  position: { x: number; y: number };
}

export function CardPreview({ cardName, position }: CardPreviewProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setImageUrl(null);

    const timer = setTimeout(() => {
      fetch(`https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName)}`)
        .then(res => res.json())
        .then(data => {
          const url = data.image_uris?.normal || data.card_faces?.[0]?.image_uris?.normal;
          setImageUrl(url);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }, 300);

    return () => clearTimeout(timer);
  }, [cardName]);

  if (loading) {
    return null;
  }

  if (!imageUrl) {
    return null;
  }

  const adjustedX = position.x > window.innerWidth / 2 ? position.x - 260 : position.x + 20;
  const adjustedY = position.y > window.innerHeight / 2 ? position.y - 360 : position.y;

  return (
    <div
      className="card-preview"
      style={{
        left: `${adjustedX}px`,
        top: `${adjustedY}px`,
      }}
    >
      <img src={imageUrl} alt={cardName} />
    </div>
  );
}
