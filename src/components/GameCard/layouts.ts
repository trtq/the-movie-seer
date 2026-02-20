import Animated from "react-native-reanimated";
import { s } from "react-native-size-matters";
import styled from "styled-components/native";
import { Image } from "expo-image";

export const Card = styled(Animated.View)`
  background-color: ${(props) => props.theme.menuButtonBackground};
  border-color: ${(props) => props.theme.menuButtonBorder};
  border-width: ${s(2)}px;
  position: absolute;
  height: ${s(462)}px;
  right: ${s(15)}px;
  left: ${s(15)}px;
  border-radius: ${s(20)}px;
  align-self: center;
`;

export const Loader = styled.ActivityIndicator.attrs((props) => ({
  size: "large",
  color: props.theme.primary,
}))`
  flex: 1;
`;

export const MoviePicture = styled(Image).attrs({
  contentFit: "cover",
})`
  border-color: ${(props) => props.theme.menuButtonBorder};
  border-width: ${s(1)}px;
  border-radius: ${s(10)}px;
  align-self: stretch;
  height: ${s(170)}px;
  margin: ${s(10)}px ${s(10)}px 0 ${s(10)}px;
  background-color: ${(props) => props.theme.primaryTransparent};
`;

export const AnswersContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding: ${s(5)}px 0 ${s(5)}px 0;
`;
