import Animated from "react-native-reanimated";
import { s } from "react-native-size-matters";
import styled from "styled-components/native";

export const AnswerPressable = styled.Pressable`
  border-radius: ${s(10)}px;
  align-self: stretch;
  height: ${s(57)}px;
  margin: ${s(5)}px ${s(10)}px;
`;

export const AnswerAnimated = styled(Animated.View)`
  border-color: ${(props) => props.theme.menuButtonBorder};
  background-color: ${(props) => props.theme.menuButtonBackground};
  border-width: ${s(1)}px;
  border-radius: ${s(10)}px;
  align-self: stretch;
  padding: 0 ${s(15)}px;
  justify-content: center;
  height: ${s(57)}px;
`;

export const AnswerText = styled.Text.attrs({
  numberOfLines: 2,
  adjustsFontSizeToFit: true,
})`
  color: ${(props) => props.theme.primary};
  font-size: ${s(14)}px;
  line-height: ${s(18)}px;
  font-family: "NotoSans_400Regular";
  width: 100%;
  text-align: center;
`;
