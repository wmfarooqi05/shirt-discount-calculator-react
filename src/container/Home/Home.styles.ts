import styled from "styled-components";

import { theme } from "../../constant/theme/theme";

export const Container = styled.div`
  width: 90%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.h1`
  font-size: 40px;
  text-align: center;
  color: ${theme.DARK_BLUE};
`;

export const ListContainer = styled.div`
  display: flex;
`;

export const BottomContainer = styled.div`
  display: flex;
  margin-top: 40px;
  align-items: center;
`;

export const CalculateButton = styled.button`
  height: 40px;
  width: 200px;
  border-radius: 10px;
  border: 0;
  color: ${theme.WHITE};
  font-size: 16px;
  background-color: ${theme.DARK_BLUE};
  font-weight: bold;
`;

export const FinalPrice = styled.p`
  margin-left: 40px;
  font-size: 20px;
  color: ${theme.DARK_BLUE};
`;
