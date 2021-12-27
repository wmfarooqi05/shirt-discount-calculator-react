import produce from "immer";
import React, { useState } from "react";

import Card from "../../component/Card";
import { BASE_PRICE, DISCOUNT_PERCENTAGES } from "./Home.constant";
import {
  BottomContainer,
  CalculateButton,
  Container,
  FinalPrice,
  Header,
  ListContainer,
} from "./Home.styles";
import { SHIRT_ITEM_TYPE } from "./Home.types";

const Home = ({ mockShirtList }: { mockShirtList: SHIRT_ITEM_TYPE[] }) => {
  const [cartItems, setCartItems] = useState(mockShirtList);
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

  /**
   *
   * @param distinctGroupSize number
   * @returns priceWithDiscount number
   * This is a helper function which returns the discounted price by applying
   * the discount percentage on BASE_PRICE
   * Example
   *  - If distinctGroupSize is 5, it will apply 25% discount on BASE_PRICE * 5 shirts
   */
  const getDiscountPriceForDistinctGroup = (
    distinctGroupSize: number
  ): number => {
    const discountPercentage = DISCOUNT_PERCENTAGES[distinctGroupSize - 1];
    const actualPrice = BASE_PRICE * distinctGroupSize;
    // eslint-disable-next-line prettier/prettier
    return actualPrice - (actualPrice * (discountPercentage / 100));
  };

  /**
   *
   * @param shirtsAddedToCart number[]
   * @param maxGroupSizeAllowed number
   * @returns discountedPrice number
   * This is a recurrsive helper function
   * It calculates the totalDiscountedPrice for a given number of shirts and
   * their maximum group size allowed
   * Example
   * If shirts are 2,2,2,1,1 and
   *  - for maxGroupSize = 5, it will return 51.60
   *  - for maxGroupSize = 4, it will return 51.20
   */
  const getDiscountedPrice = (
    shirtsAddedToCart: number[],
    maxGroupSizeAllowed: number
  ): number => {
    if (shirtsAddedToCart.length === 0) return 0;
    if (maxGroupSizeAllowed === 0) return 0;
    if (shirtsAddedToCart.filter((x) => x > 0).length === 0) return 0;

    shirtsAddedToCart.sort((a, b) => b - a);
    let distinctGroupSize = 0;
    for (let i = 0; i < maxGroupSizeAllowed; i++) {
      if (shirtsAddedToCart[i] > 0) {
        shirtsAddedToCart[i]--;
        distinctGroupSize++;
      }
    }

    return (
      getDiscountPriceForDistinctGroup(distinctGroupSize) +
      getDiscountedPrice(shirtsAddedToCart, maxGroupSizeAllowed)
    );
  };

  /**
   * This is the main function
   * ## Functionality
   * 1- It will first get maximum group size (maximum distinct shirts).
   * 2- Then it will calculate maximum discount or minimum price to pay twice
   *    two maximum group sizes using getDiscountedPrice
   *    - GROUP1: With maximum group size
   *    - GROUP2: With (Max - 1) Group Size
   * ## Example
   * If the count of shirts added are 2,2,2,1,1, here Maximum Group Size is 5
   * it will calculate against two times with MaxGroupSize=5 and MaxGroupSize=4
   *  Group 1: Discount of 5 shirts + Discount of 3 shirts (Maximum Group Size = 5)
   *  Group 2: Discount of 4 shirts + Discount of 4 shirts (Maximum Group Size = 4)
   *
   * Then It will get the minimum price and store it in finalPrice state
   */
  const calculatePrice = () => {
    /** Filter out the noOfShirtsAddedToCart from Cart */
    const shirtsAddedToCart: number[] = cartItems.map(
      (x: SHIRT_ITEM_TYPE): number => {
        return x.noOfShirtsAddedToCard;
      }
    );

    /** Get the maximum group size i.e. maximum number of distinct shirts added to cart */
    const maxGroupSizeAllowed = getMaxGroupAvailable(shirtsAddedToCart);

    /** Now calculate discounted price for two different maxGroupSize  */
    const price1 = getDiscountedPrice(
      [...shirtsAddedToCart],
      maxGroupSizeAllowed
    );
    const price2 = getDiscountedPrice(
      [...shirtsAddedToCart],
      maxGroupSizeAllowed - 1
    );

    /** Set the minimum price (maximum discounted price) as final price */
    if (Math.min(price1, price2) === 0) {
      setFinalPrice(Math.max(price1, price2));
    } else {
      setFinalPrice(Math.min(price1, price2));
    }
  };

  return (
    <Container>
      <Header>Shirt Discount calculator</Header>
      <ListContainer id="shirt-list-container">
        {cartItems.map((x: SHIRT_ITEM_TYPE) => {
          return (
            <Card
              id={x.id}
              key={x.id}
              imageUrl={x.imageUrl}
              noOfShirtsAddedToCard={x.noOfShirtsAddedToCard}
              addItem={onAddItem}
              removeItem={onRemoveItem}
            />
          );
        })}
      </ListContainer>
      <BottomContainer>
        <CalculateButton id="calculate-price" onClick={calculatePrice}>
          Calculate Price
        </CalculateButton>
        <FinalPrice id="final-price">Final Price {finalPrice}</FinalPrice>
      </BottomContainer>
    </Container>
  );
};

export default Home;
