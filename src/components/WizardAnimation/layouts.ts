import wizardPicture from "@assets/wizard.webp";
import tvPicture from "@assets/wizardtv.webp";
import { s } from "react-native-size-matters";
import { Image } from "expo-image";
import styled from "styled-components/native";
import Animated from "react-native-reanimated";

export const WizardContainer = styled.View`
  width: ${s(320)}px;
  height: ${s(320)}px;
`;

export const Wizard = styled(Animated.Image).attrs({
  source: wizardPicture,
  resizeMode: "contain",
})`
  width: 87%;
  height: 87%;
  top: 5%;
  left: -0%;
  position: absolute;
`;

export const WizardTV = styled(Image).attrs({
  source: tvPicture,
  contentFit: "contain",
})`
  width: 59%;
  height: 59%;
  right: 0%;
  bottom: -5%;
  position: absolute;
`;

export const Movie = styled(Image).attrs({
  contentFit: "cover",
  transition: 170,
})`
  width: ${s(177)}px;
  height: ${s(101)}px;
  position: absolute;
  bottom: ${s(36)}px;
  right: ${s(6)}px;
`;

export const MovieTint = styled.View`
  width: ${s(177)}px;
  height: ${s(101)}px;
  position: absolute;
  background-color: black;
  bottom: ${s(36)}px;
  right: ${s(6)}px;
  opacity: 0.2;
`;
