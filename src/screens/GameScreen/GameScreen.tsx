import { Button, Text } from "react-native";
import { Container } from "./layouts";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SCREENS, TQuizNavigatorStackParamList } from "@/router/types";
import { GameCard } from "@/components/GameCard/GameCard";
import { useState } from "react";

export const GameScreen = ({
  navigation,
}: NativeStackScreenProps<TQuizNavigatorStackParamList, SCREENS.Game>) => {
  const [gameFinished, setGameFinished] = useState(false);
  return (
    <Container>
      <Button title="back" onPress={navigation.goBack} />
      <Text>Here i will change questions</Text>
      <GameCard />
      <Button title="finish game" onPress={() => setGameFinished(true)} />
      {gameFinished && (
        <>
          <Button title="start again" onPress={() => setGameFinished(false)} />
          <Button title="back to main screen" onPress={navigation.popToTop} />
        </>
      )}
    </Container>
  );
};
