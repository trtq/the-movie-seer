import { generateQuestion } from "@/apiCalls/generateQuestion";
import { ScoreContext } from "@/components/ScoreWrapper/ScoreWrapper";
import { TSCORES } from "@/components/ScoreWrapper/types";
import { DIFFICULTY_NAME } from "@/utils/difficulties/types";
import { themes } from "@/utils/themes/themes";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { GameScreen } from "./GameScreen";

jest.mock("@/apiCalls/generateQuestion");
jest.useFakeTimers();

describe("GameScreen", () => {
  const mockQuestion = [
    {
      id: 1,
      picture: "https://example.com/movie.jpg",
      answers: [
        { id: 2, name: "Correct Movie 1", correct: true },
        { id: 3, name: "Wrong Movie 2", correct: false },
        { id: 4, name: "Wrong Movie 3", correct: false },
      ],
    },
    {
      id: 2,
      picture: "https://example.com/movie2.jpg",
      answers: [
        { id: 5, name: "Correct Movie 4", correct: true },
        { id: 6, name: "Wrong Movie 5", correct: false },
        { id: 7, name: "Wrong Movie 6", correct: false },
      ],
    },
    {
      id: 3,
      picture: "https://example.com/movie3.jpg",
      answers: [
        { id: 5, name: "Correct Movie 7", correct: true },
        { id: 6, name: "Wrong Movie 8", correct: false },
        { id: 7, name: "Wrong Movie 9", correct: false },
      ],
    },
  ];
  const mockScores: TSCORES = Object.fromEntries(
    Object.values(DIFFICULTY_NAME).map((key) => [key, 0]),
  ) as TSCORES;

  const setNewScoreMock = jest.fn();
  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <ThemeProvider theme={themes.dark}>
        <ScoreContext.Provider
          value={{ scores: mockScores, setNewScore: setNewScoreMock }}
        >
          {component}
        </ScoreContext.Provider>
      </ThemeProvider>,
    );
  };

  const mockNavigation = {
    navigate: jest.fn(),
    popToTop: jest.fn(),
  } as any;

  beforeEach(() => {
    // we need to trully reset stuff here or tests get cross-contaminated and start generating incorrect questions
    (generateQuestion as jest.Mock).mockReset();
    (generateQuestion as jest.Mock)
      .mockResolvedValueOnce(mockQuestion[0])
      .mockResolvedValueOnce(mockQuestion[1])
      .mockResolvedValueOnce(mockQuestion[2]);
  });

  test("immediately renders the first two questions", async () => {
    const { findByText } = renderWithProviders(
      <GameScreen
        navigation={mockNavigation}
        route={{ params: { difficulty: DIFFICULTY_NAME.Normal } } as any}
      />,
    );

    expect(await findByText("Correct Movie 1")).toBeTruthy();
    expect(await findByText("Correct Movie 4")).toBeTruthy();
  });

  test("adds to the score when the answer is correct", async () => {
    const { findByText, findByTestId } = renderWithProviders(
      <GameScreen
        navigation={mockNavigation}
        route={{ params: { difficulty: DIFFICULTY_NAME.Normal } } as any}
      />,
    );

    let correctButton = await findByText("Correct Movie 1");
    let score = await findByTestId("score-current");
    expect(score.props.children).toBe(0);
    fireEvent.press(correctButton);
    await waitFor(async () => {
      const updatedScore = await findByTestId("score-current");
      expect(updatedScore.props.children).toBe(1);
    });
  });

  test("reacts to the button only once", async () => {
    const { findByText, findByTestId } = renderWithProviders(
      <GameScreen
        navigation={mockNavigation}
        route={{ params: { difficulty: DIFFICULTY_NAME.Normal } } as any}
      />,
    );

    let correctButton = await findByText("Correct Movie 1");
    let score = await findByTestId("score-current");
    expect(score.props.children).toBe(0);
    fireEvent.press(correctButton);
    fireEvent.press(correctButton);
    fireEvent.press(correctButton);
    fireEvent.press(correctButton);
    await waitFor(async () => {
      const updatedScore = await findByTestId("score-current");
      expect(updatedScore.props.children).toBe(1);
    });
  });

  test("reacts correctly to a wrong answer, with number of hearts going down", async () => {
    const { findByText, findAllByTestId } = renderWithProviders(
      <GameScreen
        navigation={mockNavigation}
        route={{ params: { difficulty: DIFFICULTY_NAME.Normal } } as any}
      />,
    );

    let incorrectButton = await findByText("Wrong Movie 2");
    let hearts = await findAllByTestId("heart-icon");
    expect(hearts.length).toBe(3);
    fireEvent.press(incorrectButton);
    await waitFor(async () => {
      const updatedHearts = await findAllByTestId("heart-icon");
      expect(updatedHearts.length).toBe(2);
    });
  });

  test("shows the game over modal when the game is lost", async () => {
    const { findByText, findAllByTestId, queryByTestId, findByTestId } =
      renderWithProviders(
        <GameScreen
          navigation={mockNavigation}
          route={{ params: { difficulty: DIFFICULTY_NAME.Normal } } as any}
        />,
      );

    let incorrectButton = await findByText("Wrong Movie 2");
    let hearts = await findAllByTestId("heart-icon");
    expect(hearts.length).toBe(3);
    fireEvent.press(incorrectButton);
    hearts = await findAllByTestId("heart-icon");
    expect(hearts.length).toBe(2);
    incorrectButton = await findByText("Wrong Movie 5");
    fireEvent.press(incorrectButton);
    hearts = await findAllByTestId("heart-icon");
    expect(hearts.length).toBe(1);
    incorrectButton = await findByText("Wrong Movie 8");
    fireEvent.press(incorrectButton);
    expect(await queryByTestId("heart-icon")).toBeNull();
    expect(await findByTestId("game-over-modal")).toBeTruthy();
  });
});
