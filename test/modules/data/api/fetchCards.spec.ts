import { fetchCards } from "@src/modules/data/api/fetchCards";
import { GET_CARDS_URL } from "@src/modules/data/constants/endpoints";
import { formattedRawCardsFixture, rawCardsFixture } from "../fixtures/cardsFixtures";

describe("fetchCards", () => {
  let spyFetch: jest.SpyInstance;
  let spyConsoleError: jest.SpyInstance;

  beforeEach(() => {
    global.fetch = jest.fn();
    spyFetch = jest.spyOn(global, "fetch");
    spyConsoleError = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should fetch cards and return formatted data", async () => {
    spyFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ cards: rawCardsFixture }),
    } as Response);

    const result = await setup();

    expect(global.fetch).toHaveBeenCalledWith(GET_CARDS_URL);
    expect(result).toEqual(formattedRawCardsFixture);
  });

  it("Should return an empty array if fetch fails", async () => {
    spyFetch.mockRejectedValue(new Error("Random error"));

    const result = await setup();

    expect(global.fetch).toHaveBeenCalledWith(GET_CARDS_URL);
    expect(spyConsoleError).toHaveBeenCalledWith("Failed to fetch cards:", expect.any(Error));
    expect(result).toEqual([]);
  });
});

const setup = async () => {
  return await fetchCards();
};
