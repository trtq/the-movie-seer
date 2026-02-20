jest.mock("expo-font", () => ({
  isLoaded: jest.fn(),
  loadAsync: jest.fn(),
  useFonts: jest.fn(() => []),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn().mockResolvedValue(null),
  setItem: jest.fn(),
}));

jest.mock("@react-navigation/native", () => ({
  // ...jest.requireActual("@react-navigation/native"),
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  })),
  useIsFocused: jest.fn(() => true),
}));

jest.mock("styled-components", () => ({
  ...jest.requireActual("styled-components"),
  useTheme: jest.fn(),
}));

jest.mock("react-native-safe-area-context", () => ({
  ...jest.requireActual("react-native-safe-area-context"),
  useSafeAreaInsets: jest.fn(() => ({ top: 0 })),
}));

require("react-native-reanimated").setUpTests();
