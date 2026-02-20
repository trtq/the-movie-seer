import { AntDesign, Entypo } from "@expo/vector-icons";
import Animated, { PinwheelOut } from "react-native-reanimated";
import { s, vs } from "react-native-size-matters";
import styled from "styled-components/native";

export const InsideContainer = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
`;

export const HeartsBlock = styled.View`
  height: ${vs(30)}px;
  align-items: center;
  flex-direction: row-reverse;
  position: absolute;
  top: ${vs(0)}px;
  right: ${s(20)}px;
`;

export const HeartContainer = styled(Animated.View).attrs({
  exiting: PinwheelOut.delay(500),
})``;

export const Heart = styled(Entypo).attrs({
  color: "deeppink",
  size: vs(19),
})``;

export const ScoreContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${vs(33)}px;
  justify-content: center;
  align-items: center;
`;

export const GiveUpButtonContainer = styled.TouchableOpacity`
  width: ${vs(30)}px;
  height: ${vs(30)}px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: ${vs(0)}px;
  left: ${s(20)}px;
`;

export const GiveUpButtonButtonIcon = styled(AntDesign).attrs({
  color: "#a10000",
  size: vs(22),
})``;
