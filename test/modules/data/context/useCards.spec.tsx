import { renderHook, waitFor, act } from "@testing-library/react";
import { useCards, CardsProvider } from "@src/modules/data/context/useCards/useCards";
import * as cookiesNext from "cookies-next";
import { cardsFixtures, cookiesFixtures } from "../fixtures/cardsFixtures";

jest.mock("cookies-next", () => ({
  getCookie: jest.fn(),
  setCookie: jest.fn(),
}));

const spyGetCookie = jest.spyOn(cookiesNext, "getCookie");
const spySetCookie = jest.spyOn(cookiesNext, "setCookie");

jest.mock("@src/modules/data/context/useData/useData", () => {
  const actual = jest.requireActual("@src/modules/data/context/useData/useData");

  return {
    __esModule: true,
    ...actual,
    useData: () => {
      return { cards: cardsFixtures, isLoading: false };
    },
  };
});

describe("CardsProvider", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should initialize with an empty list and isLoading true", async () => {
    const { result } = renderHook(() => useCards(), { wrapper: CardsProvider });

    await waitFor(() => expect(result.current.isLoading).toBe(true));
    expect(result.current.cardsList).toEqual([]);
  });

  it("Should load cards from cookie correctly", async () => {
    spyGetCookie.mockReturnValue(JSON.stringify(cookiesFixtures));

    const { result } = renderHook(() => useCards(), { wrapper: CardsProvider });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.cardsList.length).toBe(2);
  });

  it("Should handle empty cookie scenario", async () => {
    spyGetCookie.mockReturnValue(undefined);

    const { result } = renderHook(() => useCards(), { wrapper: CardsProvider });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.cardsList).toEqual([]);
  });

  it("Should add a card to the list", async () => {
    spyGetCookie.mockReturnValue(JSON.stringify(cookiesFixtures));

    const { result } = renderHook(() => useCards(), { wrapper: CardsProvider });

    await waitFor(async () => {
      const message = result.current.addCard("id1");
      await waitFor(() => expect(message).toBe("Card added to your list"));
    });
  });

  it("Should not add a duplicate card", async () => {
    spyGetCookie.mockReturnValue(JSON.stringify(cookiesFixtures));

    const { result } = renderHook(() => useCards(), { wrapper: CardsProvider });

    await waitFor(() => {
      result.current.addCard("id1");
    });

    await waitFor(() => {
      const message = result.current.addCard("id1");
      expect(message).toBe("Card already added");
    });

    await waitFor(() => expect(result.current.cardsList.length).toBe(2));
  });

  it("Should remove a card from the list", async () => {
    spyGetCookie.mockReturnValue(JSON.stringify(cookiesFixtures));

    const { result } = renderHook(() => useCards(), { wrapper: CardsProvider });

    await waitFor(() => {
      result.current.addCard("id1");
    });

    act(() => {
      const message = result.current.removeCard("id1");
      expect(message).toBe("Card removed from your list");
    });

    await waitFor(() => expect(result.current.cardsList.length).toBe(1));
  });

  it("Should not remove a card that does not exist", async () => {
    spyGetCookie.mockReturnValue(undefined);

    const { result } = renderHook(() => useCards(), { wrapper: CardsProvider });

    act(() => {
      const message = result.current.removeCard("id40");
      expect(message).toBe("Card id not found");
    });

    await waitFor(() => expect(result.current.cardsList.length).toBe(0));
    expect(spySetCookie).not.toHaveBeenCalled();
  });

  it("Should throw an error if useCards is used outside of CardsProvider", () => {
    expect(() => renderHook(() => useCards())).toThrow(
      "useCards must be used within a CardsProvider"
    );
  });
});
