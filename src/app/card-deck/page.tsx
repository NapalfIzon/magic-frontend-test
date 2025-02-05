"use client";

import { useEffect, useState } from "react";
import { Card as CardComponent, Carousel, Placeholder } from "react-bootstrap";
import { useData } from "@src/modules/data/context/useData/useData";
import { Card } from "@src/modules/data/types/Card";
import { useCards } from "@src/modules/data/context/useCards/useCards";
import { DEFAULT_PAGE_NAME } from "@src/routes";

import styles from "./cardsdeck.module.scss";

const Cardsdeck = () => {
  const [deck, setDeck] = useState<Card[]>([]);
  const { cards, isLoading } = useData();
  const { cardsList, addCard } = useCards();

  useEffect(() => {
    document.title = `Card deck - ${DEFAULT_PAGE_NAME}`;
  }, []);
  useEffect(() => {
    if (!isLoading && cards?.length) {
      setDeck(cards);
    }
  }, [cards]);

  const handleCollectionAction = (cardId: string) => {
    addCard(cardId);
  };

  return (
    <div className={styles["cards-deck"]}>
      <div className={styles["cards-deck__container"]}>
        <div className={styles["cards-deck__container__title"]}>
          <h1>{`${DEFAULT_PAGE_NAME} - Card deck`}</h1>
        </div>
        {isLoading && (
          <div>
            <CardComponent style={{ width: "18rem" }}>
              <CardComponent.Img
                variant="top"
                style={{
                  width: "286px",
                  height: "397px",
                  backgroundColor: "grey",
                }}
              />
              <CardComponent.Body>
                <Placeholder as={CardComponent.Title} animation="glow">
                  <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={CardComponent.Text} animation="glow">
                  <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
                  <Placeholder xs={6} /> <Placeholder xs={8} />
                </Placeholder>
              </CardComponent.Body>
            </CardComponent>
          </div>
        )}

        {!isLoading && (
          <div className={styles["cards-deck__container__carousel"]}>
            <Carousel interval={null} indicators={false} controls={true}>
              {deck.length > 0 &&
                deck.map((card, index) => {
                  const isCardInCollection = !!cardsList.find(
                    (cardList) => cardList.id === card.id
                  );

                  return (
                    <Carousel.Item key={card.id}>
                      <div className={styles["cards-deck__container__carousel--item"]}>
                        <CardComponent style={{ width: "18rem" }}>
                          <CardComponent.Title
                            className={styles["cards-deck__container__carousel--item__title"]}
                          >{`${index + 1}/${deck.length}`}</CardComponent.Title>
                          <CardComponent.Img variant="top" src={card.imageUrl} />
                          <CardComponent.Body
                            className={styles["cards-deck__container__carousel--item__body"]}
                          >
                            {/* <CardComponent.Link href={`${routePaths.CARD_DECK}/${card.id}`}>
                              More info
                            </CardComponent.Link> */}
                            <CardComponent.Link
                              className={isCardInCollection ? styles["collected"] : undefined}
                              role="button"
                              aria-disabled={isCardInCollection}
                              onClick={() => handleCollectionAction(card.id)}
                            >
                              {isCardInCollection
                                ? "Added to collection"
                                : "Add to your collection"}
                            </CardComponent.Link>
                          </CardComponent.Body>
                        </CardComponent>
                      </div>
                    </Carousel.Item>
                  );
                })}
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cardsdeck;
