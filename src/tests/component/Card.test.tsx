import { shallow } from "enzyme";
import React from "react";

import Card from "../../component/Card";
import { SHIRT_ITEM_TYPE } from "../../container/Home/Home.types";

const props: SHIRT_ITEM_TYPE = {
  id: 1,
  imageUrl: "https://image-test.com",
  noOfShirtsAddedToCard: 2,
};

describe("Card", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("Card must render properly", () => {
    const onAddItemFunc = jest.fn();
    const onRemoveItemFunc = jest.fn();
    const cardComponent = shallow(
      <Card {...props} addItem={onAddItemFunc} removeItem={onRemoveItemFunc} />
    );
    expect(cardComponent.exists()).toBeTruthy();
  });

  it("Add Item button should work properly", () => {
    const onAddItemFunc = jest.fn();
    const onRemoveItemFunc = jest.fn();
    const cardComponent = shallow(
      <Card {...props} addItem={onAddItemFunc} removeItem={onRemoveItemFunc} />
    );

    cardComponent.find("#add-button").simulate("click");
    expect(onAddItemFunc).toBeCalled();
  });

  it("Remove Item button should work properly", () => {
    const onAddItemFunc = jest.fn();
    const onRemoveItemFunc = jest.fn();
    const cardComponent = shallow(
      <Card {...props} addItem={onAddItemFunc} removeItem={onRemoveItemFunc} />
    );

    cardComponent.find("#remove-button").simulate("click");
    expect(onRemoveItemFunc).toBeCalled();
  });

  it("Must render correct number of shirts added", () => {
    const onAddItemFunc = jest.fn();
    const onRemoveItemFunc = jest.fn();
    const cardComponent = shallow(
      <Card
        {...props}
        noOfShirtsAddedToCard={2}
        addItem={onAddItemFunc}
        removeItem={onRemoveItemFunc}
      />
    );

    expect(cardComponent.find("#no-of-shirts").at(0).props().children).toEqual(
      2
    );
  });
});
