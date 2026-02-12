import { StatusBar } from "expo-status-bar";
import { Container, Warn } from "./layouts";
import { Image } from "react-native";
import favicon from "@assets/favicon.png";

export const HomeScreen = () => {
  return (
    <Container>
      <Warn>Open up App.tsx to start working on your app!</Warn>
      <Image source={favicon} />
      <StatusBar style="auto" />
    </Container>
  );
};
