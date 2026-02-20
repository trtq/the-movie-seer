import styled from "styled-components/native";
import { vs } from "react-native-size-matters";
import { FontAwesome } from "@expo/vector-icons";
import TMDBpic from "@assets/tmdb.webp";
import { Image } from "expo-image";

export const TMDBBlock = styled.View`
  flex-direction: row;
  align-items: center;
  margin: ${vs(10)}px ${vs(30)}px;
`;

export const TMDBLogo = styled(Image).attrs({
  contentFit: "contain",
  source: TMDBpic,
})`
  width: ${vs(60)}px;
  height: ${vs(60)}px;
`;

export const TMDBText = styled.Text`
  color: ${(props) => props.theme.primary};
  font-size: ${vs(12)}px;
  line-height: ${vs(15)}px;
  flex: 1;
  padding-left: ${vs(10)}px;
  font-family: "NotoSans_400Regular";
`;

export const InfoWrap = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 ${vs(30)}px;
  align-self: stretch;
`;

export const InfoText = styled.Text`
  color: ${(props) => props.theme.primary};
  font-size: ${vs(13)}px;
  line-height: ${vs(15)}px;
  font-family: "NotoSans_400Regular";
  width: 100%;
  margin-bottom: ${vs(15)}px;
`;

export const TextHighlight = styled.Text`
  font-family: "NotoSans_600SemiBold";
  color: ${(props) => props.theme.highScore};
`;

export const InfoButton = styled.TouchableHighlight.attrs((props) => ({
  underlayColor: props.theme.primaryTransparent,
}))`
  width: ${vs(180)}px;
  height: ${vs(35)}px;
  border-radius: ${vs(8)}px;
  background: ${(props) => props.theme.menuButtonBackground};
  border: ${vs(1)}px solid ${(props) => props.theme.menuButtonBorder};
  justify-content: center;
  align-items: center;
  margin-bottom: ${vs(10)}px;
`;

export const InfoButtonText = styled.Text`
  font-size: ${vs(13)}px;
  color: ${(props) => props.theme.primary};
`;

export const NameText = styled.Text`
  color: ${(props) => props.theme.primary};
  font-size: ${vs(13)}px;
  margin-bottom: ${vs(5)}px;
`;

export const DateText = styled.Text`
  color: ${(props) => props.theme.primary};
  font-size: ${vs(11)}px;
`;

export const InfoButtonIcon = styled(FontAwesome).attrs((props) => ({
  color: props.theme.themeIconColor,
  size: vs(10),
}))``;
