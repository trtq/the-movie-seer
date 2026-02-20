import styled from "styled-components/native";
import { vs } from "react-native-size-matters";

export const ButtonsBlock = styled.View`
  flex: 1;
  align-self: stretch;
  justify-content: center;
`;

export const DifficultyButton = styled.TouchableHighlight.attrs((props) => ({
  underlayColor: props.theme.primaryTransparent,
}))`
  height: ${vs(130)}px;
  border-radius: ${vs(8)}px;
  background: ${(props) => props.theme.menuButtonBackground};
  border: ${vs(1)}px solid ${(props) => props.theme.menuButtonBorder};
  justify-content: center;
  align-items: center;
  margin-bottom: ${vs(20)}px;
  margin-left: ${vs(10)}px;
  margin-right: ${vs(10)}px;
`;

export const DifficultyButtonInside = styled.View`
  flex: 1;
  align-self: stretch;
  justify-content: center;
  align-items: center;
`;

export const DifficultyButtonText = styled.Text`
  font-size: ${vs(70)}px;
  color: ${(props) => props.theme.primary};
  font-family: "BebasNeue_400Regular";
`;

export const HighscoreText = styled.Text`
  color: ${(props) => props.theme.primary};
  font-size: ${vs(14)}px;
  position: absolute;
  bottom: ${vs(10)}px;
  font-family: "BebasNeue_400Regular";
  right: ${vs(10)}px;
`;

export const HighscoreHighlight = styled.Text`
  color: ${(props) => props.theme.highScore};
`;
