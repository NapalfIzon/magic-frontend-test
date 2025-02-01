import { useState, useCallback } from "react";

export enum METHOD_TYPE {
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
}

interface UseRequestOptions {
  url: string;
  method: METHOD_TYPE;
  headers?: HeadersInit;
  body?: any;
}

interface UseRequestResponse<T> {
  isLoading: boolean;
  response: T | null;
  error: string | null;
  fetchData: () => Promise<void>;
}

const useRequest = <T>({
  url,
  method,
  headers,
  body,
}: UseRequestOptions): UseRequestResponse<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const options: RequestInit = {
        method: METHOD_TYPE[method],
        headers: headers
          ? { ...headers, "Content-Type": "application/json" }
          : { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      };

      const res = await fetch(url, options);

      const data: T = await res.json();
      setResponse(data);
    } catch (error) {
      setError((error as any).message);
    } finally {
      setIsLoading(false);
    }
  }, [url, method, headers, body]);

  return { isLoading, response, error, fetchData };
};

export default useRequest;
