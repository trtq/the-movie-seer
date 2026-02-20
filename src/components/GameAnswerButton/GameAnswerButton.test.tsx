import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { GameAnswerButton } from "./GameAnswerButton";
import { ThemeProvider } from "styled-components/native";
import { themes } from "@/utils/themes/themes";

describe("GameAnswerButton", () => {
  test("renders with children text", () => {
    const { getByText } = render(
      <ThemeProvider theme={themes.dark}>
        <GameAnswerButton onPress={() => {}} disabled={false} correct={false}>
          Test Answer
        </GameAnswerButton>
      </ThemeProvider>,
    );
    expect(getByText("Test Answer")).toBeTruthy();
  });

  test("calls onPress when pressed", () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <ThemeProvider theme={themes.dark}>
        <GameAnswerButton
          onPress={mockOnPress}
          disabled={false}
          correct={false}
        >
          Test Answer
        </GameAnswerButton>
      </ThemeProvider>,
    );
    const button = getByText("Test Answer");
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalled();
  });

  test("respects disabled state", () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <ThemeProvider theme={themes.dark}>
        <GameAnswerButton onPress={mockOnPress} disabled={true} correct={false}>
          Test Answer
        </GameAnswerButton>
      </ThemeProvider>,
    );
    const button = getByText("Test Answer");
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalledTimes(0);
  });
});
