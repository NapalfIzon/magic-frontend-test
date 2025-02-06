import { renderHook, waitFor } from "@testing-library/react";
import { useData, DataProvider } from "@src/modules/data/context/useData/useData";
import { cardsFixtures } from "../fixtures/cardsFixtures";
import * as useRequestModule from "@src/modules/shared/hooks/useRequest";

const useRequestSpy = jest.spyOn(useRequestModule, "default");

describe("DataProvider / useData", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the initial state when the context is mounted", () => {
    const fetchDataMock = jest.fn();
    useRequestSpy.mockReturnValue({
      fetchData: fetchDataMock,
      response: null,
      error: null,
      isLoading: false,
    });

    const { result } = renderHook(() => useData(), { wrapper: DataProvider });

    expect(fetchDataMock).toHaveBeenCalledTimes(1);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.cards).toEqual([]);
    expect(result.current.dataError).toBeNull();
  });

  it("should update the cards info in the context when it receives the useRequest response", async () => {
    const fakeResponse = { cards: cardsFixtures };
    useRequestSpy.mockReturnValue({
      fetchData: jest.fn(),
      response: fakeResponse,
      error: null,
      isLoading: false,
    });

    const { result } = renderHook(() => useData(), { wrapper: DataProvider });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    const cardNames = result.current.cards.map((card) => card.name);

    expect(result.current.cards.length).toBe(3);
    expect(cardNames).toEqual(expect.arrayContaining(["Card A", "Card B"]));
    expect(result.current.dataError).toBeNull();
  });

  it("should update the error value in the context when it receives an error in the useRequest response", async () => {
    const errorMessage = "Random error";
    useRequestSpy.mockReturnValue({
      fetchData: jest.fn(),
      response: null,
      error: errorMessage,
      isLoading: false,
    });

    const { result } = renderHook(() => useData(), { wrapper: DataProvider });

    await waitFor(() => expect(result.current.dataError).not.toBeNull());
    expect(result.current.dataError).toBe(errorMessage);
    expect(result.current.isLoading).toBe(false);
  });

  it("throw an error if the DataProvider is use outside it contexts", () => {
    expect(() => renderHook(() => useData())).toThrow(
      "useData must be used within a DataProvider context"
    );
  });
});
