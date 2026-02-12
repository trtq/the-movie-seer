import { TQuizNavigatorStackParamList, SCREENS } from "@/router/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Container } from "./layouts";
import { Button, Text } from "react-native";

export const AboutScreen = ({
  navigation,
}: NativeStackScreenProps<TQuizNavigatorStackParamList, SCREENS.About>) => {
  return (
    <Container>
      <Text>about</Text>
      <Button title="back" onPress={navigation.goBack} />
    </Container>
  );
};
