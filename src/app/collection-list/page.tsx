"use client";

import React, { useEffect } from "react";
import { useCards } from "@src/modules/data/context/useCards/useCards";
import { Button, Card } from "react-bootstrap";

import styles from "./collection-list.module.scss";
import { DEFAULT_PAGE_NAME } from "@src/routes";

const Collectionlist = () => {
  const { cardsList, removeCard, isLoading } = useCards();

  useEffect(() => {
    document.title = `My collection list - ${DEFAULT_PAGE_NAME}`;
  }, []);

  return (
    <div className={styles["collection-list"]}>
      <div className={styles["collection-list__header"]} data-testid="collectionListHeader">
        <h1>{`${DEFAULT_PAGE_NAME} - My Collection`}</h1>
      </div>
      <div className={styles["collection-list__container"]}>
        <div className={styles["collection-list__grid"]} data-testid="collectionListGrid">
          {!isLoading &&
            (cardsList.length > 0 ? (
              cardsList.map((card, index) => (
                <div key={index} className={styles["collection-list__grid__item"]}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      data-testid={`collectionListGridItemImage-${card.id}`}
                      variant="top"
                      src={card.imageUrl}
                    />
                    <Card.Body className={styles["collection-list__grid__item--body"]}>
                      <div
                        data-testid={`collectionListGridItemInfo-${card.id}`}
                        className={styles["collection-list__grid__item--info"]}
                      >
                        <Card.Title>{card.name}</Card.Title>
                        <Card.Text>{card.type}</Card.Text>
                      </div>
                      <div className={styles["collection-list__grid__item--options"]}>
                        <Button
                          data-testid={`collectionListGridItemRemoveButton-${card.id}`}
                          variant="link"
                          onClick={() => removeCard(card.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))
            ) : (
              <p>No cards in your collection</p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Collectionlist;
