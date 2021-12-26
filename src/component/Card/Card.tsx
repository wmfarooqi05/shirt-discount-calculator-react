/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { Adder, AmountText, CardContainer, ProductImage } from "./Card.styles";
import { Props } from "./Card.types";

const Card = ({
  addItem,
  removeItem,
  noOfShirtsAddedToCard,
  id,
  imageUrl,
}: Props) => {
  return (
    <CardContainer>
      <ProductImage src={imageUrl} />
      <>
        <Adder onClick={() => removeItem(id)}>-</Adder>
        <AmountText>{noOfShirtsAddedToCard}</AmountText>
        <Adder onClick={() => addItem(id)}>+</Adder>
      </>
    </CardContainer>
  );
};

export default Card;
