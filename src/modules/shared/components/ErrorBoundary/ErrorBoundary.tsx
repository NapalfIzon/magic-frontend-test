"use client";

import { ReactNode, useEffect, useState } from "react";
import ErrorBoundaryContent from "./ErrorBoundaryContent/ErrorBoundaryContent";

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("ErrorBoundary caught an error:", event.error);
      setHasError(true);
      setError(event.error);
    };

    window.addEventListener("error", handleError);
    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  if (hasError) {
    return <ErrorBoundaryContent buttonAction={setHasError} error={error} />;
  }

  return <>{children}</>;
};

export default ErrorBoundary;
