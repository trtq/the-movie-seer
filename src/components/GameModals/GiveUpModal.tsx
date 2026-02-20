import { FadeIn, FadeOut } from "react-native-reanimated";
import {
  ModalOverlay,
  ExitModalInside,
  ModalText,
  ModalButtons,
  ModalButtonContainer,
  ModalButtonText,
} from "./layouts";

export const GiveUpModal = ({
  onContinue,
  onMenu,
}: {
  onContinue: () => void;
  onMenu: () => void;
}) => (
  <ModalOverlay entering={FadeIn} exiting={FadeOut}>
    <ExitModalInside>
      <ModalText>Give up?</ModalText>
      <ModalButtons>
        <ModalButtonContainer positive onPress={onMenu}>
          <ModalButtonText>yes</ModalButtonText>
        </ModalButtonContainer>
        <ModalButtonContainer onPress={onContinue}>
          <ModalButtonText>no</ModalButtonText>
        </ModalButtonContainer>
      </ModalButtons>
    </ExitModalInside>
  </ModalOverlay>
);
