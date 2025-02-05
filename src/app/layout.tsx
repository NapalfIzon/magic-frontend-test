import type { Metadata } from "next";
import Header from "@src/modules/shared/components/Header/Header";
import { DataProvider } from "@src/modules/data/context/useData/useData";
import { fetchCards } from "@src/modules/data/api/fetchCards";
import BootstrapProvider from "@src/modules/shared/context/useBootstrap/useBootstrap";
import { CardsProvider } from "@src/modules/data/context/useCards/useCards";
import Footer from "@src/modules/shared/components/Footer/Footer";
import ErrorBoundary from "@src/modules/shared/components/ErrorBoundary/ErrorBoundary";
import { DEFAULT_PAGE_NAME } from "@src/routes";

import "@styles/global.scss";
import "@styles/initial.scss";

export const metadata: Metadata = {
  title: `Deck Builder - ${DEFAULT_PAGE_NAME}`,
  description: `Create your own ${DEFAULT_PAGE_NAME} deck`,
  icons: {
    icon: "/images/magic_logo.png",
  },
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body>
        <BootstrapProvider>
          <ErrorBoundary>
            <ServerDataWrapper>{children}</ServerDataWrapper>
          </ErrorBoundary>
        </BootstrapProvider>
      </body>
    </html>
  );
};

const ServerDataWrapper = async ({ children }: { children: React.ReactNode }) => {
  const cards = await fetchCards();

  return (
    <DataProvider initialCards={cards}>
      <CardsProvider>
        <Header />
        {children}
        <Footer />
      </CardsProvider>
    </DataProvider>
  );
};

export default RootLayout;
