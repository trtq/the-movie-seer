import { StatusBar } from "expo-status-bar";
import { s } from "react-native-size-matters";
import styled from "styled-components/native";

export default function App() {
  return (
    <Container>
      <Warn>Open up App.tsx to start working on your app!</Warn>
      <StatusBar style="auto" />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background: white;
  align-items: center;
  justify-content: center;
`;

const Warn = styled.Text`
  font-size: ${s(12)}px;
`;
