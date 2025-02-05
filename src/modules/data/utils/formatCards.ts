import { Card } from "../types/Card";
import { randomCards } from "./randomCards";

export const formatCards = (cards: Card[]) => {
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

  const randomOrderCards = randomCards(formattedCards);

  return randomOrderCards;
};
