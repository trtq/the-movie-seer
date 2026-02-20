import styled from "styled-components/native";
import LogoPic from "@assets/logo.webp";
import LogoDarkPic from "@assets/logo-dark.webp";
import { Image } from "expo-image";
import { vs } from "react-native-size-matters";
import { WizardAnimation } from "@/components/WizardAnimation/WizardAnimation";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export const Logo = styled(Image).attrs((props) => ({
  source: props.theme.role === "light" ? LogoPic : LogoDarkPic,
  contentFit: "contain",
}))`
  align-self: stretch;
  height: ${vs(100)}px;
  margin: 0 ${vs(10)}px;
`;

export const ButtonsBlock = styled.View`
  flex: 1;
  justify-content: center;
  align-self: stretch;
  margin-top: ${vs(55)}px;
`;

export const ButtonContainer = styled.TouchableHighlight.attrs((props) => ({
  underlayColor: props.theme.primaryTransparent,
}))`
  background-color: ${(props) => props.theme.menuButtonBackground};
  margin: ${vs(6)}px ${vs(50)}px;
  height: ${vs(42)}px;
  border-width: ${vs(1)}px;
  align-items: center;
  justify-content: center;
  border-color: ${(props) => props.theme.menuButtonBorder};
  border-radius: ${vs(7)}px;
`;

export const ButtonText = styled.Text`
  color: ${(props) => props.theme.primary};
  font-size: ${vs(20)}px;
  margin-bottom: ${vs(-2)}px;
  font-family: "BebasNeue_400Regular";
`;

export const Wizard = styled(WizardAnimation)`
  width: ${vs(190)}px;
  height: ${vs(190)}px;
  margin-left: ${vs(-10)}px;
  transform: rotate(3deg);
`;

export const BottomElements = styled.View`
  align-self: stretch;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

export const ThemeButton = styled.TouchableOpacity`
  width: ${vs(30)}px;
  height: ${vs(30)}px;
  align-items: center;
  justify-content: center;
  margin-right: ${vs(20)}px;
  margin-bottom: ${vs(10)}px;
`;

export const ThemeIcon = styled(FontAwesome).attrs((props) => ({
  name: props.theme.themeIcon,
  color: props.theme.themeIconColor,
  size: vs(27),
}))``;
