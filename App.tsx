import { ScoreWrapper } from "@/components/ScoreWrapper/ScoreWrapper";
import { ThemeWrapper } from "@/components/ThemeWrapper/ThemeWrapper";
import { QuizNavigator } from "@/router/QuizNavigator";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <ThemeWrapper>
        <ScoreWrapper>
          <QuizNavigator />
        </ScoreWrapper>
      </ThemeWrapper>
    </NavigationContainer>
  );
}
