import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { AnswerAnimated, AnswerPressable, AnswerText } from "./layouts";
import { useTheme } from "styled-components/native";

// the button in the game. Here we set up the nice animation - the button gets bigger on press in, and then turns to the correct color on press
export const GameAnswerButton = ({
  children,
  disabled,
  onPress,
  correct,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onPress: () => void;
  correct: boolean;
}) => {
  const scale = useSharedValue(1);
  const color = useSharedValue(0);

  const theme = useTheme();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: interpolateColor(
      color.value,
      [0, 1],
      [
        theme.menuButtonBackground,
        correct ? "rgba(28,255,89,0.7)" : "rgba(255,47,28,0.7)",
      ],
    ),
  }));

  const handlePressIn = () => {
    scale.value = withSpring(1.12, { damping: 40, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 90, stiffness: 300 });
  };

  const handlePress = () => {
    color.value = withTiming(1, { duration: 800 });
    onPress();
  };

  return (
    <AnswerPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      disabled={disabled}
      testID="question-button"
    >
      <AnswerAnimated style={animatedStyle}>
        <AnswerText>{children}</AnswerText>
      </AnswerAnimated>
    </AnswerPressable>
  );
};
