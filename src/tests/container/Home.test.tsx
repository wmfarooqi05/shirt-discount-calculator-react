/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { mount, shallow } from "enzyme";
import produce from "immer";
import React from "react";
import { act } from "react-dom/test-utils";

import Home from "../../container/Home";
import { BASE_PRICE, mockShirtList } from "../../container/Home/Home.constant";

describe("Home container", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("Home must render correctly", () => {
    expect(
      shallow(<Home mockShirtList={...mockShirtList} />).exists()
    ).toBeTruthy();
  });

  it("Should render correct number of Shirt Cards", () => {
    const wrapper = shallow(<Home mockShirtList={...mockShirtList} />);
    expect(wrapper.find("#shirt-list-container").children().length).toEqual(
      mockShirtList.length
    );
  });

  it("Should update the shirt count in state", async () => {
    const setState = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);

    const wrapper = mount(<Home mockShirtList={...mockShirtList} />);
    await act(async () => {
      wrapper
        .find("#shirt-list-container")
        .children()
        .at(1)
        .find("#add-button")
        .first()
        .simulate("click");
    });
    wrapper.update();

    const updatedState = produce(mockShirtList, (draftState: any) => {
      draftState[0].noOfShirtsAddedToCard++;
    });
    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState).toHaveBeenCalledWith(updatedState);
  });

  it("Should calculate the final price", async () => {
    const updatedState = produce(mockShirtList, (draftState: any) => {
      draftState[0].noOfShirtsAddedToCard = 2;
      draftState[1].noOfShirtsAddedToCard = 2;
      draftState[2].noOfShirtsAddedToCard = 2;
      draftState[3].noOfShirtsAddedToCard = 1;
      draftState[4].noOfShirtsAddedToCard = 1;
    });

    const setState = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);

    const wrapper = mount(<Home mockShirtList={updatedState} />);
    await act(async () => {
      wrapper.find("#calculate-price").first().simulate("click");
    });
    wrapper.update();

    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState).toHaveBeenCalledWith(51.2);
  });

  it("Final Price should be 0 in case of empty cart", async () => {
    const updatedState = produce(mockShirtList, (draftState: any) => {});

    const setState = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);

    const wrapper = mount(<Home mockShirtList={updatedState} />);
    await act(async () => {
      wrapper.find("#calculate-price").first().simulate("click");
    });
    wrapper.update();

    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState).toHaveBeenCalledWith(0);
  });

  it("Final Price should be BASE_PRICE in case of 1 item", async () => {
    const updatedState = produce(mockShirtList, (draftState: any) => {
      draftState[4].noOfShirtsAddedToCard = 1;
    });

    const setState = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);

    const wrapper = mount(<Home mockShirtList={updatedState} />);
    await act(async () => {
      wrapper.find("#calculate-price").first().simulate("click");
    });
    wrapper.update();

    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState).toHaveBeenCalledWith(BASE_PRICE);
  });
});
