import { ThemeWrapper } from "@/components/ThemeWrapper/ThemeWrapper";
import { QuizNavigator } from "@/router/QuizNavigator";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <ThemeWrapper>
          <QuizNavigator />
      </ThemeWrapper>
    </NavigationContainer>
  );
}
