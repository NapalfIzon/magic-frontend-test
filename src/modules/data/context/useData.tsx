import { createContext, useContext, useEffect, useMemo, useState } from "react";
import useRequest, { METHOD_TYPE } from "@src/modules/shared/hooks/useRequest";
import { Card } from "../types/Card";

type DataContextType = {
  cards: Card[];
  isLoading: boolean;
  dataError: string | null;
};

const GET_CARDS_URL = "https://api.magicthegathering.io/v1/cards";

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [cardsData, setCardsData] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {
    fetchData,
    response,
    error: requestError,
  } = useRequest<{ cards: any[] }>({
    url: GET_CARDS_URL,
    method: METHOD_TYPE.GET,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const formattedCards = useMemo<Card[]>(
    () => (response ? formatCards(response.cards) : []),
    [response]
  );

  const populateCardsData = () => {
    setCardsData(formattedCards);
  };

  useEffect(() => {
    if (response) {
      populateCardsData();
      setIsLoading(false);
    }
  }, [response, formattedCards]);

  const value = useMemo(
    () => ({ cards: cardsData, isLoading, dataError: requestError }),
    [cardsData, isLoading, requestError]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider context");
  }
  return context;
};

const formatCards = (cards: any[]): Card[] => {
  return cards
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
};
