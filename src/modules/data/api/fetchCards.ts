import { GET_CARDS_URL } from "../constants/endpoints";
import { Card } from "../types/Card";
import { formatCards } from "../utils/formatCards";

export const fetchCards = async (): Promise<[] | Card[]> => {
  try {
    const response = await fetch(GET_CARDS_URL);

    if (!response.ok) {
      throw new Error(`Error fetching cards: ${response.statusText}`);
    }

    const data = await response.json();

    return formatCards(data.cards);
  } catch (error) {
    console.error("Failed to fetch cards:", error);
    return [];
  }
};
