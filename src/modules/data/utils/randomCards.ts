import { Card } from "../types/Card";

export const randomCards = (originalArray: Card[]) => {
  const temporalArray = originalArray.slice();
  for (let i = temporalArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [temporalArray[i], temporalArray[j]] = [temporalArray[j], temporalArray[i]];
  }

  return temporalArray;
};
