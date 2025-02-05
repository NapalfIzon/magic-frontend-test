import { Card } from "../types/Card";

export const formatCards = (cards: Card[]) => {
  if (cards.length === 0) {
    return [];
  }

  const formattedCards = cards
    .map((card) => ({
      name: card.name,
      manaCost: card.manaCost,
      colors: card.colors,
      type: card.type,
      setName: card.setName,
      text: card.text,
      power: card.power,
      toughness: card.toughness,
      imageUrl: card.imageUrl,
      id: card.id,
    }))
    .filter((item, index, self) => index === self.findIndex((i) => i.name === item.name));

  return formattedCards;
};
