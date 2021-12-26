import produce from "immer";
import React, { useState } from "react";

import Card from "../../component/Card";
import { BASE_PRICE, cards, DISCOUNT_PERCENTAGES } from "./Home.constant";
import { CalculateButton, Container, ListContainer } from "./Home.styles";
import { CARD_TYPE } from "./Home.types";

const Home = () => {
  const [cartItems, setCartItems] = useState(cards);
  const [finalPrice, setFinalPrice] = useState(0);

  const onAddItem = (id: number) => {
    const index = cartItems.findIndex((x) => x.id === id);
    if (index > -1) {
      const newItems = produce(cartItems, (draftState) => {
        draftState[index].noOfShirtsAddedToCard++;
      });
      setCartItems(newItems);
    }
  };

  const onRemoveItem = (id: number) => {
    const index = cartItems.findIndex((x) => x.id === id);
    if (
      index > -1 &&
      cartItems[index] &&
      cartItems[index].noOfShirtsAddedToCard > 0
    ) {
      const newItems = produce(cartItems, (draftState) => {
        draftState[index].noOfShirtsAddedToCard--;
      });
      setCartItems(newItems);
    }
  };

  const getMaxGroupAvailable = (shirtsAddedToCart: number[]): number => {
    return shirtsAddedToCart.filter((x) => x > 0).length;
  };

  const getPriceFromGroupCount = (cardGroupSize: number): number => {
    const discountPercentage = DISCOUNT_PERCENTAGES[cardGroupSize - 1];
    const actualPrice = BASE_PRICE * cardGroupSize;
    // eslint-disable-next-line prettier/prettier
    return actualPrice - (actualPrice * (discountPercentage / 100));
  };

  const getDiscountedPrice = (
    shirtsAddedToCart: number[],
    maxGroupSizeAllowed: number
  ): number => {
    if (shirtsAddedToCart.length === 0) return 0;
    if (shirtsAddedToCart.filter((x) => x > 0).length === 0) return 0;

    shirtsAddedToCart.sort((a, b) => b - a);
    let cardGroupSize = 0;
    for (let i = 0; i < maxGroupSizeAllowed; i++) {
      if (shirtsAddedToCart[i] > 0) {
        shirtsAddedToCart[i]--;
        cardGroupSize++;
      }
    }

    return (
      getPriceFromGroupCount(cardGroupSize) +
      getDiscountedPrice(shirtsAddedToCart, maxGroupSizeAllowed)
    );
  };

  const calculatePrice = () => {
    const shirtsAddedToCart: number[] = cartItems.map(
      (x: CARD_TYPE): number => {
        return x.noOfShirtsAddedToCard;
      }
    );

    const maxGroupSizeAllowed = getMaxGroupAvailable(shirtsAddedToCart);

    setFinalPrice(
      Math.min(
        getDiscountedPrice([...shirtsAddedToCart], maxGroupSizeAllowed),
        getDiscountedPrice([...shirtsAddedToCart], maxGroupSizeAllowed - 1)
      )
    );
  };

  return (
    <Container>
      <ListContainer>
        {cartItems.map((x: CARD_TYPE) => {
          return (
            <Card
              id={x.id}
              imageUrl={x.imageUrl}
              noOfShirtsAddedToCard={x.noOfShirtsAddedToCard}
              addItem={onAddItem}
              removeItem={onRemoveItem}
            />
          );
        })}
      </ListContainer>
      <CalculateButton onClick={calculatePrice}>
        Calculate Price
      </CalculateButton>
      <p>Final Price {finalPrice}</p>
    </Container>
  );
};

export default Home;