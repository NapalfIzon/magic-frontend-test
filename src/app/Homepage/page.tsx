"use client";

import React from "react";
import Link from "next/link";
import { Card } from "react-bootstrap";
import { DEFAULT_PAGE_NAME, routePaths } from "@src/routes";

import styles from "./homepage.module.scss";

const HomePage = () => {
  return (
    <div className={styles["home-page"]}>
      <div className={styles["home-page__container"]}>
        <section className={styles["home-page__title"]}>
          <h1>{`${DEFAULT_PAGE_NAME} - Deck builder`}</h1>
        </section>
        <section className={styles["home-page__options"]}>
          <div className={styles["home-page__options--card-deck"]}>
            <Link href={`${routePaths.CARD_DECK}`}>
              <Card className={styles["home-page__options--card-deck__container"]}>
                <Card.Img variant="top" src="/images/magic_cards.png" />
                <Card.Body className={styles["home-page__options--card-deck__body"]}>
                  <Card.Title>Card deck</Card.Title>
                  <Card.Text className={styles["home-page__options--card-deck__text"]}>
                    Check out all the cards you can use to build your deck. The possibilities are
                    endless!
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </div>
          <div className={styles["home-page__options--my-collection"]}>
            <Link href="/collection-list">
              <Card className={styles["home-page__options--card-deck__container"]}>
                <div className={styles["home-page__options--my-collection__image"]}>
                  <Card.Img variant="top" src="/images/magic_deck.png" />
                </div>
                <Card.Body className={styles["home-page__options--my-collection__body"]}>
                  <Card.Title>My collection</Card.Title>
                  <Card.Text className={styles["home-page__options--my-collection__text"]}>
                    Check your deck and review the possible combos you can use!
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
