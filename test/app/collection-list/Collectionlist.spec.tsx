import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { DEFAULT_PAGE_NAME } from "@src/routes";
import Collectionlist from "@src/app/collection-list/page";
import { storedCardsFixtures } from "../../modules/data/fixtures/cardsFixtures";

let mockedCardsList = storedCardsFixtures;
let mockedIsLoading = false;
const mockedRemoveCard = jest.fn();

jest.mock("@src/modules/data/context/useCards/useCards", () => {
  const actual = jest.requireActual("@src/modules/data/context/useCards/useCards");

  return {
    __esModule: true,
    ...actual,
    useCards: () => {
      return {
        cardsList: mockedCardsList,
        removeCard: mockedRemoveCard,
        isLoading: mockedIsLoading,
      };
    },
  };
});

describe("Collectionlist", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should render the page - happy path", () => {
    const { getByTestId, getByRole, getAllByTestId } = setup();

    expect(document.title).toBe(`My collection list - ${DEFAULT_PAGE_NAME}`);
    expect(getByTestId("collectionListHeader")).toBeInTheDocument();
    expect(getByRole("heading", { level: 1 })).toHaveTextContent(
      `${DEFAULT_PAGE_NAME} - My Collection`
    );
    expect(getByTestId("collectionListGrid")).toBeInTheDocument();
    expect(getAllByTestId(/^collectionListGridItemImage-/)).toHaveLength(
      storedCardsFixtures.length
    );
    expect(getAllByTestId(/^collectionListGridItemRemoveButton-/)).toHaveLength(
      storedCardsFixtures.length
    );
  });

  it("Should render 'No cards in your collection' when cardsList is empty", () => {
    mockedCardsList = [];

    const { getByText } = setup();

    expect(getByText("No cards in your collection")).toBeInTheDocument();
  });

  it("Should allow removing a card", () => {
    mockedCardsList = storedCardsFixtures;

    const { getAllByTestId } = setup();

    const removeButtons = getAllByTestId(/^collectionListGridItemRemoveButton-/);
    fireEvent.click(removeButtons[0]);

    expect(mockedRemoveCard).toHaveBeenCalledWith(storedCardsFixtures[0].id);
  });

  it("Should not render cards when isLoading is true", () => {
    mockedIsLoading = true;

    const { queryByTestId, queryAllByTestId } = setup();

    expect(queryByTestId("collectionListGrid")).not.toBeInTheDocument();
    expect(queryAllByTestId(/^collectionListGridItemImage-/)).toHaveLength(0);
    expect(queryAllByTestId(/^collectionListGridItemRemoveButton-/)).toHaveLength(0);
  });
});

const setup = () => {
  return render(<Collectionlist />);
};
