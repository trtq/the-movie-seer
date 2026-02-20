import { ThemeProvider } from "styled-components";
import { createContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import { THEME_NAMES, themes } from "@/utils/themes/themes";
import { BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue/400Regular";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import {
  NotoSans_600SemiBold,
  NotoSans_400Regular,
} from "@expo-google-fonts/noto-sans";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const defaultTheme =
  Appearance.getColorScheme() === "light"
    ? THEME_NAMES.light
    : THEME_NAMES.dark;

// unless we're making a 3rd theme, storing just one fn in context is enough and way cleaner
export const ThemeContext = createContext<() => void>(() => {});

// context for keeping information about the theme and to load up fonts
// this is the component that turns off the splash screen once everything is loaded
export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<THEME_NAMES | null>(null);

  let [fontsLoaded] = useFonts({
    BebasNeue_400Regular,
    NotoSans_400Regular,
    NotoSans_600SemiBold,
  });

  useEffect(() => {
    AsyncStorage.getItem("theme")
      .then((savedTheme) => {
        setTheme((savedTheme as THEME_NAMES) || defaultTheme);
      })
      .catch(() => setTheme(defaultTheme));
  }, []);

  useEffect(() => {
    if (fontsLoaded && theme) {
      SplashScreen.hide();
    }
  }, [fontsLoaded, theme]);

  const changeTheme = () => {
    setTheme((oldTheme) => {
      const newTheme =
        oldTheme === THEME_NAMES.dark ? THEME_NAMES.light : THEME_NAMES.dark;
      AsyncStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext value={changeTheme}>
      <StatusBar style={theme === THEME_NAMES.dark ? "light" : "dark"} />
      <ThemeProvider theme={themes[theme || "dark"]}>{children}</ThemeProvider>
    </ThemeContext>
  );
};
