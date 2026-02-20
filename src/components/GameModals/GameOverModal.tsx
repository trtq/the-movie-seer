import { FadeIn } from "react-native-reanimated";
import {
  ModalOverlay,
  ExitModalInside,
  ModalText,
  RetryButtonContainer,
  ModalButtonText,
} from "./layouts";

export const GameOverModal = ({
  onRestart,
  onMenu,
  score,
}: {
  onRestart: () => void;
  onMenu: () => void;
  score: number;
}) => (
  <ModalOverlay testID="game-over-modal" entering={FadeIn.delay(1200)}>
    <ExitModalInside>
      <ModalText>Final score: {score}</ModalText>
      <RetryButtonContainer onPress={onRestart}>
        <ModalButtonText>Play again</ModalButtonText>
      </RetryButtonContainer>
      <RetryButtonContainer onPress={onMenu}>
        <ModalButtonText>Menu</ModalButtonText>
      </RetryButtonContainer>
    </ExitModalInside>
  </ModalOverlay>
);
