import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREENS, TQuizNavigatorStackParamList } from "./types";
import { HomeScreen } from "@/screens/HomeScreen/HomeScreen";
import { GameScreen } from "@/screens/GameScreen/GameScreen";
import { DifficultyScreen } from "@/screens/DifficultyScreen/DifficultyScreen";
import { AboutScreen } from "@/screens/AboutScreen/AboutScreen";

const Stack = createNativeStackNavigator<TQuizNavigatorStackParamList>();

export const QuizNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREENS.Home} component={HomeScreen} />
      <Stack.Screen name={SCREENS.Game} component={GameScreen} />
      <Stack.Screen name={SCREENS.Difficulty} component={DifficultyScreen} />
      <Stack.Screen name={SCREENS.About} component={AboutScreen} />
    </Stack.Navigator>
  );
};
