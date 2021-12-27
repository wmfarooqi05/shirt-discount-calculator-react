import styled from "styled-components";

import { theme } from "../../constant/theme/theme";

export const CardContainer = styled.div`
  width: 200px;
  height: 300px;
  margin: 20px 15px;
  border-radius: 10px;

  box-shadow: 1px 0px 14px -3px rgba(0, 0, 0, 0.43);
  -webkit-box-shadow: 1px 0px 14px -3px rgba(0, 0, 0, 0.43);
  -moz-box-shadow: 1px 0px 14px -3px rgba(0, 0, 0, 0.43);
`;

export const ProductImageContainer = styled.div`
  margin: 20px 15px 0;
  height: 220px;
`;
export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20%;
  height: 60px;
`;

export const Adder = styled.button`
  border-radius: 20px;
  height: 30px;
  width: 30px;
  border: 0px;
  font-size: 20px;

  box-shadow: 1px 0px 14px -3px rgba(0, 0, 0, 0.43);
  -webkit-box-shadow: 1px 0px 14px -3px rgba(0, 0, 0, 0.43);
  -moz-box-shadow: 1px 0px 14px -3px rgba(0, 0, 0, 0.43);
`;

export const AmountText = styled.p`
  font-size: 20px;
  color: ${theme.DARK_BLUE};
`;
