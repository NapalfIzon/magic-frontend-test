"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Card } from "@src/modules/data/types/Card";
import useRequest, { METHOD_TYPE } from "@src/modules/shared/hooks/useRequest";
import { formatCards } from "@src/modules/data/utils/formatCards";
import { GET_CARDS_URL } from "@src/modules/data/constants/endpoints";

type DataContextType = {
  cards: Card[];
  isLoading: boolean;
  dataError: string | null;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({
  children,
  initialCards = [],
}: {
  children: React.ReactNode;
  initialCards?: Card[] | [];
}) => {
  const [cardsData, setCardsData] = useState<Card[]>(initialCards);
  const [isLoading, setIsLoading] = useState<boolean>(!initialCards.length);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  useEffect(() => {
    if (response) {
      const currentCardData = formatCards([...cardsData, ...response.cards]);
      setCardsData(currentCardData);
      setIsLoading(false);
    }
    if (requestError) {
      setErrorMessage(requestError);
      setIsLoading(false);
    }
  }, [response]);

  const value = useMemo(
    () => ({ cards: cardsData, isLoading, dataError: errorMessage }),
    [cardsData, isLoading]
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
