import { vs } from "react-native-size-matters";
import styled from "styled-components/native";

export const ScoreContainer = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

export const Current = styled.Text<{ green: boolean }>`
  flex: 1;
  text-align: right;
  font-family: "NotoSans_400Regular";
  font-size: ${vs(16)}px;
  color: ${({ theme: { primary, highScore }, green }) =>
    green ? highScore : primary};
`;

export const Slash = styled.Text`
  font-family: "NotoSans_400Regular";
  color: ${(props) => props.theme.primary};
  font-size: ${vs(20)}px;
  margin-top: ${vs(-6)}px;
  margin: ${vs(-6)}px ${vs(6)}px 0 ${vs(6)}px;
`;

export const High = styled.Text`
  flex: 1;
  text-align: left;
  font-family: "NotoSans_400Regular";
  color: ${(props) => props.theme.primary};
  font-size: ${vs(18)}px;
`;
