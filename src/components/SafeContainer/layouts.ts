import styled from "styled-components/native";
import BackgroundLoop from "@assets/background-loop.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { vs } from "react-native-size-matters";

export const Background = styled.ImageBackground.attrs((props) => ({
  source: BackgroundLoop,
  resizeMode: "repeat",
  tintColor: props.theme.backgroundHighlight,
}))`
  flex: 1;
  margin: ${vs(-10)}px;
  padding: ${vs(10)}px;
  background-color: ${(props) => props.theme.background};
`;

export const SafeView = styled(SafeAreaView).attrs({
  edges: { top: "maximum", bottom: "maximum" },
})`
  flex: 1;
  padding-top: ${vs(60)}px;
  padding-bottom: ${vs(20)}px;
  align-items: center;
`;
