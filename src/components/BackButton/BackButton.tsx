import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BackButtonContainer, BackButtonIcon } from "./layouts";

export const BackButton = ({ onPress }: { onPress: () => void }) => {
  const insets = useSafeAreaInsets();

  return (
    <BackButtonContainer onPress={onPress} top={insets.top}>
      <BackButtonIcon name="arrow-left" />
    </BackButtonContainer>
  );
};
