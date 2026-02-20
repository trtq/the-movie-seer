import { Background, SafeView } from "./layouts";

//this component provides a SafeView with a nice themed background
export const SafeContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Background>
      <SafeView>{children}</SafeView>
    </Background>
  );
};
