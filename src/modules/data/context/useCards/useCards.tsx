"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { useData } from "../useData/useData";
import { Card } from "../../types/Card";

interface CardsContextType {
  cardsList: Card[];
  addCard: (id: string) => string | void;
  removeCard: (id: string) => string | void;
  isLoading: boolean;
}

const CardsContext = createContext<CardsContextType | undefined>(undefined);

export const CardsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [storedCards, setStoredCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { cards } = useData();

  useEffect(() => {
    getCardsList();
  }, []);

  const getCardsList = async (): Promise<never[] | undefined> => {
    try {
      const storedValue = await getCookie("cards-list");

      if (!storedValue) {
        setIsLoading(false);
        return [];
      }

      const listOfCards: string[] = JSON.parse(storedValue);

      const populatedStoredCards = cards.filter((card) => listOfCards.includes(card.id));

      setStoredCards(populatedStoredCards);
      setIsLoading(false);
    } catch (error: any) {
      console.error("Error parsing cards-list cookie: ", error.message);
      setStoredCards([]);
    }
  };

  const addCard = (id: string): string | void => {
    const hasStoredCard = storedCards.find((card) => card.id === id);

    if (hasStoredCard) {
      return "Card already added";
    }

    const newStoredCard = cards.find((card) => card.id === id);

    if (!newStoredCard) {
      return "Card not found";
    }

    const newStoredCardList = [...storedCards, newStoredCard];
    updateCardsList(newStoredCardList);

    return "Card added to your list";
  };

  const removeCard = (id: string): string | void => {
    const hasStoredCard = storedCards.find((card) => card.id === id);

    if (!hasStoredCard) {
      return "Card id not found";
    }

    const newStoredCardList = storedCards.filter((card) => card.id !== id);
    updateCardsList(newStoredCardList);

    return "Card removed from your list";
  };

  const updateCardsList = (cardsList: Card[]): void => {
    setStoredCards(cardsList);

    const storedCardsIds = cardsList.map((card) => card.id);
    setCookie("cards-list", JSON.stringify(storedCardsIds), { path: "/" });
  };

  const value: CardsContextType = React.useMemo(
    () => ({ cardsList: storedCards, addCard, removeCard, isLoading }),
    [storedCards, addCard, removeCard]
  );
  return <CardsContext.Provider value={value}>{children}</CardsContext.Provider>;
};

export const useCards = (): CardsContextType => {
  const context = useContext(CardsContext);
  if (!context) {
    throw new Error("useCards must be used within a CardsProvider");
  }
  return context;
};
