"use client";

import Image from "next/image";
import styles from "./error-boundary-content.module.scss";
import { Alert, Button } from "react-bootstrap";

interface ErrorBoundaryContentProps {
  error: Error | null;
  buttonAction: (value: boolean) => void;
}

const ErrorBoundaryContent = ({ error, buttonAction }: ErrorBoundaryContentProps) => {
  return (
    <div className={styles["error-boundary"]}>
      <section className={styles["error-boundary__container"]}>
        <div className={styles["error-boundary__container__image"]}>
          <Image src="/images/magic_one_ring.jpg" alt="Error" width={215} height={300} />
        </div>
        <h1>Oops! Something went wrong.</h1>
        <div className={styles["error-boundary__container__text"]}>
          <Alert className={styles["error-boundary__container__text--content"]} variant={"warning"}>
            <p>{error?.message}</p>
          </Alert>
        </div>
        <div className={styles["error-boundary__container__button"]}>
          <Button variant="warning" onClick={() => buttonAction(false)}>
            Try Again
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ErrorBoundaryContent;
