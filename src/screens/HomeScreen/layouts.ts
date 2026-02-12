import { s } from "react-native-size-matters";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background: white;
  align-items: center;
  justify-content: center;
`;

export const Warn = styled.Text`
  font-size: ${s(12)}px;
`;
