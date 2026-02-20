import wizardPicture from "@assets/wizard.webp";
import tvPicture from "@assets/wizardtv.webp";
import { vs } from "react-native-size-matters";
import { Image } from "expo-image";
import styled from "styled-components/native";
import Animated from "react-native-reanimated";

export const WizardContainer = styled.View`
  width: ${vs(320)}px;
  height: ${vs(320)}px;
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
  transform: rotate(-3deg);
`;

export const Movie = styled(Image).attrs({
  contentFit: "cover",
  transition: 170,
})`
  width: 55%;
  height: 32%;
  position: absolute;
  bottom: 11%;
  right: 2%;
  transform: rotate(-3deg);
`;

export const MovieTint = styled.View`
  width: 55%;
  height: 32%;
  position: absolute;
  bottom: 11%;
  right: 2%;
  transform: rotate(-3deg);
`;
