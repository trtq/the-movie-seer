import { DIFFICULTY_NAME } from "@/utils/difficulties/types";
import { ScoreContext } from "../ScoreWrapper/ScoreWrapper";
import { render, waitFor } from "@testing-library/react-native";
import { ScoreCount } from "./ScoreCount";
import { themes } from "@/utils/themes/themes";
import { ThemeProvider } from "styled-components";

describe("ScoreCount", () => {
  const mockScores = {
    [DIFFICULTY_NAME.Easy]: 5,
    [DIFFICULTY_NAME.Normal]: 3,
    [DIFFICULTY_NAME.Hard]: 1,
  };

  const mockSetNewScore = jest.fn();

  const renderWithContext = (component: React.ReactElement) => {
    return render(
      <ThemeProvider theme={themes.dark}>
        <ScoreContext.Provider
          value={{ scores: mockScores, setNewScore: mockSetNewScore }}
        >
          {component}
        </ScoreContext.Provider>
      </ThemeProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders current and high scores", () => {
    const { getByText } = renderWithContext(
      <ScoreCount currentScore={3} difficulty={DIFFICULTY_NAME.Easy} />,
    );

    expect(getByText("3")).toBeTruthy();
    expect(getByText("5")).toBeTruthy();
  });

  test("updates high score when current exceeds high score", async () => {
    renderWithContext(
      <ScoreCount currentScore={10} difficulty={DIFFICULTY_NAME.Easy} />,
    );

    await waitFor(() => {
      expect(mockSetNewScore).toHaveBeenCalledWith(DIFFICULTY_NAME.Easy, 10);
    });
  });

  test("the score is not highlighted when it's smaller than highscore", async () => {
    const { findByText } = renderWithContext(
      <ScoreCount currentScore={1} difficulty={DIFFICULTY_NAME.Easy} />,
    );

    const currentScore = await findByText("1");
    expect(currentScore.props.green).toBe(false);
  });

  test("the score is highlighted when it's equal to highscore", async () => {
    const { findAllByText } = renderWithContext(
      <ScoreCount currentScore={5} difficulty={DIFFICULTY_NAME.Easy} />,
    );

    const currentScore = (await findAllByText("5"))[0];
    await waitFor(() => {
      expect(currentScore.props.green).toBe(true);
    });
  });
});
