import { FadeIn } from "react-native-reanimated";
import {
  ModalOverlay,
  ExitModalInside,
  ModalText,
  RetryButtonContainer,
  ModalButtonText,
} from "./layouts";

export const ErrorModal = ({ onMenu }: { onMenu: () => void }) => (
  <ModalOverlay entering={FadeIn}>
    <ExitModalInside>
      <ModalText>Something went wrong!</ModalText>
      <RetryButtonContainer onPress={onMenu}>
        <ModalButtonText>Menu</ModalButtonText>
      </RetryButtonContainer>
    </ExitModalInside>
  </ModalOverlay>
);
