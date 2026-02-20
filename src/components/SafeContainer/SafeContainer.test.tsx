import React from "react";
import { render } from "@testing-library/react-native";
import { SafeContainer } from "./SafeContainer";
import { Text } from "react-native";

describe("SafeContainer", () => {
  test("renders children", () => {
    const { getByText } = render(
      <SafeContainer>
        <Text>Test Content</Text>
      </SafeContainer>,
    );

    expect(getByText("Test Content")).toBeTruthy();
  });
});
