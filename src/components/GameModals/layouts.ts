import { AntDesign } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { s, vs } from "react-native-size-matters";
import styled from "styled-components/native";

// not using standard Modal fron react-native since this is more responsive
export const ModalOverlay = styled(Animated.View)`
  background: rgba(0, 0, 0, 0.25);
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

export const ExitModalInside = styled.View`
  background-color: ${(props) => props.theme.menuButtonBackground};
  border-color: ${(props) => props.theme.menuButtonBorder};
  border-width: ${s(2)}px;
  border-radius: ${s(20)}px;
  width: ${s(250)}px;
  height: ${s(200)}px;
  justify-content: space-evenly;
`;

export const ModalText = styled.Text`
  color: ${(props) => props.theme.primary};
  font-size: ${s(25)}px;
  line-height: ${s(30)}px;
  font-family: "NotoSans_400Regular";
  width: 100%;
  text-align: center;
`;

export const ModalButtons = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const ModalButtonContainer = styled.TouchableOpacity<{
  positive?: boolean;
}>`
  background-color: ${(props) =>
    props.positive ? "rgba(28,255,89,0.5)" : "rgba(255,47,28,0.5)"};
  width: ${s(90)}px;
  height: ${s(40)}px;
  align-items: center;
  justify-content: center;
  border-color: ${(props) => props.theme.menuButtonBorder};
  border-width: ${s(1)}px;
  border-radius: ${s(5)}px;
`;

export const RetryButtonContainer = styled.TouchableOpacity`
  align-self: stretch;
  height: ${s(40)}px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.menuButtonBackground};
  border-color: ${(props) => props.theme.menuButtonBorder};
  border-width: ${s(1)}px;
  border-radius: ${s(5)}px;
  margin: 0 ${s(30)}px;
`;

export const ModalButtonText = styled.Text`
  color: ${(props) => props.theme.primary};
  font-size: ${s(30)}px;
  margin-bottom: ${s(-1)}px;
  font-family: "BebasNeue_400Regular";
  text-align: center;
`;
