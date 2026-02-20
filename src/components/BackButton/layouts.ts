import { FontAwesome } from "@expo/vector-icons";
import { vs } from "react-native-size-matters";
import styled from "styled-components/native";

export const BackButtonContainer = styled.TouchableOpacity<{ top: number }>`
  width: ${vs(35)}px;
  height: ${vs(35)}px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: ${({ top }) => Math.max(top, vs(15))}px;
  left: ${vs(5)}px;
`;

export const BackButtonIcon = styled(FontAwesome).attrs((props) => ({
  color: props.theme.themeIconColor,
  size: vs(20),
}))``;
