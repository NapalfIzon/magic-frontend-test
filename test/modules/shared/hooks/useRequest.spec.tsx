import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import useRequest, { METHOD_TYPE } from "@src/modules/shared/hooks/useRequest";

describe("useRequest hook", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return the initial state without loading, response and error", () => {
    setup({ url: "https://example.com", method: METHOD_TYPE.GET });

    expect(screen.getByTestId("loading").textContent).toBe("false");
    expect(screen.getByTestId("response").textContent).toBe("null");
    expect(screen.getByTestId("error").textContent).toBe("null");
  });

  it("should call the fetchData callback when button is pressed and update the states", async () => {
    const expectedData = { foo: "bar" };
    const fetchResponse = Promise.resolve({
      json: () => Promise.resolve(expectedData),
    });
    global.fetch = jest.fn().mockResolvedValue(fetchResponse);

    setup({ url: "https://example.com", method: METHOD_TYPE.GET });
    fireEvent.click(screen.getByTestId("fetch-button"));

    expect(screen.getByTestId("loading").textContent).toBe("true");

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false");
    });

    expect(screen.getByTestId("response").textContent).toBe(JSON.stringify(expectedData));
    expect(screen.getByTestId("error").textContent).toBe("null");

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://example.com",
      expect.objectContaining({
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: undefined,
      })
    );
  });

  it("should manage the error when the fetch fails", async () => {
    const errorMessage = "Random error";
    global.fetch = jest.fn().mockRejectedValue(new Error(errorMessage));

    setup({ url: "https://example.com", method: METHOD_TYPE.GET });
    fireEvent.click(screen.getByTestId("fetch-button"));

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false");
    });

    expect(screen.getByTestId("response").textContent).toBe("null");
    expect(screen.getByTestId("error").textContent).toBe(errorMessage);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("should send the correct options in a POST request", async () => {
    const expectedData = { success: true };
    const fetchResponse = Promise.resolve({
      json: () => Promise.resolve(expectedData),
    });
    global.fetch = jest.fn().mockResolvedValue(fetchResponse);

    const body = { name: "John Doe" };

    setup({ url: "https://example.com/post", method: METHOD_TYPE.POST, body });
    fireEvent.click(screen.getByTestId("fetch-button"));

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false");
    });

    expect(screen.getByTestId("response").textContent).toBe(JSON.stringify(expectedData));
    expect(screen.getByTestId("error").textContent).toBe("null");

    expect(global.fetch).toHaveBeenCalledWith(
      "https://example.com/post",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
    );
  });

  it("should change the isLoading state correctly in a fetch request", async () => {
    let resolveFetch: any;
    const fetchPromise = new Promise((resolve) => {
      resolveFetch = () =>
        resolve({
          json: () => Promise.resolve({ foo: "bar" }),
        });
    });
    global.fetch = jest.fn().mockImplementation(() => fetchPromise);

    setup({ url: "https://example.com", method: METHOD_TYPE.GET });
    fireEvent.click(screen.getByTestId("fetch-button"));

    expect(screen.getByTestId("loading").textContent).toBe("true");

    act(() => {
      resolveFetch();
    });

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false");
    });
  });
});

const setup = ({
  url,
  method,
  headers,
  body,
}: {
  url: string;
  method: METHOD_TYPE;
  headers?: HeadersInit;
  body?: any;
}) => {
  return render(
    <RandomComponent
      url={url}
      method={method}
      {...(headers ? { headers } : {})}
      {...(body ? { body } : {})}
    />
  );
};

const RandomComponent = ({
  url,
  method,
  headers,
  body,
}: {
  url: string;
  method: METHOD_TYPE;
  headers?: HeadersInit;
  body?: any;
}) => {
  const { isLoading, response, error, fetchData } = useRequest<any>({
    url,
    method,
    headers,
    body,
  });

  return (
    <div>
      <div data-testid="loading">{isLoading ? "true" : "false"}</div>
      <div data-testid="response">{response ? JSON.stringify(response) : "null"}</div>
      <div data-testid="error">{error ?? "null"}</div>
      <button data-testid="fetch-button" onClick={() => fetchData()}>
        Fetch
      </button>
    </div>
  );
};
