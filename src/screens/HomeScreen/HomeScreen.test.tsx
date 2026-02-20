import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { HomeScreen } from "./HomeScreen";
import { SCREENS } from "@/router/types";
import { themes } from "@/utils/themes/themes";
import { ThemeProvider } from "styled-components/native";
import LogoDarkPic from "@assets/logo-dark.webp";
import LogoPic from "@assets/logo.webp";

const mockNavigation = {
  navigate: jest.fn(),
} as any;

describe("HomeScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders home screen correctly", async () => {
    const { findByText, findByTestId } = render(
      <HomeScreen navigation={mockNavigation} route={{} as any} />,
    );
    expect(await findByText("play")).toBeTruthy();
    expect(await findByText("about")).toBeTruthy();
    expect(await findByTestId("theme-button")).toBeTruthy();
  });

  test("sends user to difficulty screen when they press 'play'", async () => {
    const { findByText } = render(
      <HomeScreen navigation={mockNavigation} route={{} as any} />,
    );
    fireEvent.press(await findByText("play"));
    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith(SCREENS.Difficulty);
    });
  });

  test("sends user to about screen when they press 'about'", async () => {
    const { findByText } = render(
      <HomeScreen navigation={mockNavigation} route={{} as any} />,
    );
    fireEvent.press(await findByText("about"));
    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith(SCREENS.About);
    });
  });

  test("logo is different depending on the theme", async () => {
    const { findByTestId } = render(
      <ThemeProvider theme={themes.dark}>
        <HomeScreen navigation={mockNavigation} route={{} as any} />,
      </ThemeProvider>,
    );
    const logo = await findByTestId("logo");
    expect(logo.props.source[0]).toBe(LogoDarkPic);
    const { findByTestId: findByTestIdDark } = render(
      <ThemeProvider theme={themes.light}>
        <HomeScreen navigation={mockNavigation} route={{} as any} />,
      </ThemeProvider>,
    );
    const logoDark = await findByTestIdDark("logo");
    expect(logoDark.props.source[0]).toBe(LogoPic);
  });
});
