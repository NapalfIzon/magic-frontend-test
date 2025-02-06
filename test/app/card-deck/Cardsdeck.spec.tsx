import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import Cardsdeck from "@src/app/card-deck/page";
import { DEFAULT_PAGE_NAME } from "@src/routes";
import { cardsFixtures, storedCardsFixtures } from "../../modules/data/fixtures/cardsFixtures";

let mockedIsLoading = false;
const mockedAddCard = jest.fn();

jest.mock("@src/modules/data/context/useData/useData", () => {
  const actual = jest.requireActual("@src/modules/data/context/useData/useData");

  return {
    __esModule: true,
    ...actual,
    useData: () => {
      return { cards: cardsFixtures, isLoading: mockedIsLoading };
    },
  };
});

jest.mock("@src/modules/data/context/useCards/useCards", () => {
  const actual = jest.requireActual("@src/modules/data/context/useCards/useCards");

  return {
    __esModule: true,
    ...actual,
    useCards: () => {
      return { cardsList: storedCardsFixtures, addCard: mockedAddCard };
    },
  };
});

describe("Cardsdeck", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render the page - happy path", () => {
    const { getByTestId, getByRole } = setup();

    expect(getByTestId("cardsDeckTitle")).toBeInTheDocument();
    expect(getByRole("heading", { level: 1 })).toHaveTextContent(
      `${DEFAULT_PAGE_NAME} - Card deck`
    );
    expect(document.title).toBe(`Card deck - ${DEFAULT_PAGE_NAME}`);
  });

  it("Should render loading placeholder when isLoading is true", () => {
    mockedIsLoading = true;

    const { getByTestId } = setup();

    expect(getByTestId("cardsDeckLoading")).toBeInTheDocument();
  });

  it("Should render the carousel when isLoading is false", () => {
    mockedIsLoading = false;

    const { getByTestId, getAllByTestId } = setup();

    expect(getByTestId("cardsDeckCarousel")).toBeInTheDocument();
    expect(getAllByTestId(/^cardsDeckCarouselButtonItem-/)).toHaveLength(cardsFixtures.length);
  });

  it("Should allow adding a card to the collection", async () => {
    mockedIsLoading = false;

    const { getByTestId } = setup();

    const firstCardButton = getByTestId(`cardsDeckCarouselButtonItem-${cardsFixtures[0].id}`);
    fireEvent.click(firstCardButton);

    await waitFor(() => {
      expect(mockedAddCard).toHaveBeenCalledWith(cardsFixtures[0].id);
    });
  });

  it("Should show 'Added to collection' for already collected cards", () => {
    mockedIsLoading = false;

    const { getByTestId } = setup();

    const firstCardButton = getByTestId(`cardsDeckCarouselButtonItem-${cardsFixtures[0].id}`);
    expect(firstCardButton).toHaveTextContent("Added to collection");
    expect(firstCardButton).toHaveAttribute("aria-disabled", "true");
  });
});

const setup = () => {
  return render(<Cardsdeck />);
};
