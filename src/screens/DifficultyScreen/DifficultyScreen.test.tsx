import { ScoreContext } from "@/components/ScoreWrapper/ScoreWrapper";
import { TSCORES } from "@/components/ScoreWrapper/types";
import { SCREENS } from "@/router/types";
import { DifficultyScreen } from "@/screens/DifficultyScreen/DifficultyScreen";
import { DIFFICULTY_NAME } from "@/utils/difficulties/types";
import { themes } from "@/utils/themes/themes";
import {
  fireEvent,
  render,
  waitFor,
  within,
} from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";

jest.mock("@/apiCalls/generateQuestion");
jest.useFakeTimers();

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
} as any;

const mockScores: TSCORES = Object.fromEntries(
  Object.values(DIFFICULTY_NAME).map((key) => [
    key,
    Math.floor(Math.random() * 1000),
  ]),
) as TSCORES;

describe("integration tests", () => {
  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <ThemeProvider theme={themes.dark}>
        <ScoreContext.Provider
          value={{ scores: mockScores, setNewScore: jest.fn() }}
        >
          {component}
        </ScoreContext.Provider>
      </ThemeProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("difficulty screen displays all difficulty options", async () => {
    const { findByText } = renderWithProviders(
      <DifficultyScreen navigation={mockNavigation} route={{} as any} />,
    );

    for (const difficulty in DIFFICULTY_NAME) {
      expect(await findByText(difficulty)).toBeTruthy();
    }
  });

  test("selecting easy difficulty starts game with easy settings", async () => {
    const navigation = { navigate: jest.fn() };
    const { getByText } = renderWithProviders(
      <DifficultyScreen navigation={navigation as any} route={{} as any} />,
    );

    const easyButton = getByText(DIFFICULTY_NAME.Easy);
    fireEvent.press(easyButton);

    await waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith(SCREENS.Game, {
        difficulty: DIFFICULTY_NAME.Easy,
      });
    });
  });

  test("displays high scores for each difficulty", async () => {
    const { findByTestId } = renderWithProviders(
      <DifficultyScreen navigation={mockNavigation} route={{} as any} />,
    );

    for (const difficulty in DIFFICULTY_NAME) {
      const el = await findByTestId(difficulty + "difficultytest");
      expect(
        await within(el).findByText(
          mockScores[difficulty as DIFFICULTY_NAME].toString(),
        ),
      ).toBeTruthy();
    }
  });
});
