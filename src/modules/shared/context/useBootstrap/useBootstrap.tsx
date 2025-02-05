"use client";

import { SSRProvider } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const BootstrapProvider = ({ children }: { children: React.ReactNode }) => {
  return <SSRProvider>{children}</SSRProvider>;
};

export default BootstrapProvider;
