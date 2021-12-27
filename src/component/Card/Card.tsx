/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import {
  Adder,
  AmountText,
  ButtonContainer,
  CardContainer,
  ProductImage,
  ProductImageContainer,
} from "./Card.styles";
import { Props } from "./Card.types";

const Card = ({
  addItem,
  removeItem,
  noOfShirtsAddedToCard,
  id,
  imageUrl,
}: Props) => {
  return (
    <CardContainer id={`#card-container-${id}`}>
      <ProductImageContainer>
        <ProductImage src={imageUrl} />
      </ProductImageContainer>
      <ButtonContainer>
        <Adder id="remove-button" onClick={() => removeItem(id)}>
          -
        </Adder>
        <AmountText id="no-of-shirts">{noOfShirtsAddedToCard}</AmountText>
        <Adder id="add-button" onClick={() => addItem(id)}>
          +
        </Adder>
      </ButtonContainer>
    </CardContainer>
  );
};

export default Card;
