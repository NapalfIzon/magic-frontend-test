export const DEFAULT_PAGE_NAME = "Magic: The Gathering";

export enum routePaths {
  HOME_PAGE = "/",
  CARD_DECK = "/card-deck",
  COLLECTION_LIST = "/collection-list",
}

export enum PageNames {
  HOME_PAGE = "Home",
  CARD_DECK = "Card deck",
  COLLECTION_LIST = "Collection list",
}

export const routes = [
  { name: `${PageNames.HOME_PAGE}`, path: routePaths.HOME_PAGE },
  { name: `${PageNames.CARD_DECK}`, path: routePaths.CARD_DECK },
  { name: `${PageNames.COLLECTION_LIST}`, path: routePaths.COLLECTION_LIST },
];
