import { generateQuestion } from "@/apiCalls/generateQuestion";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { GameCard } from "./GameCard";
import { DIFFICULTY_NAME } from "@/utils/difficulties/types";
import { ThemeProvider } from "styled-components/native";
import { themes } from "@/utils/themes/themes";

jest.mock("@/apiCalls/generateQuestion");

describe("GameCard", () => {
  const mockQuestion = {
    id: 1,
    picture: "https://com.com/com.com",
    answers: [
      { id: 2, name: "Correct Movie", correct: true },
      { id: 3, name: "Wrong Movie 1", correct: false },
      { id: 4, name: "Wrong Movie 2", correct: false },
    ],
  };

  const mockAnimationProgress = {
    value: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (generateQuestion as jest.Mock).mockResolvedValue(mockQuestion);
  });

  test("renders question after loading", async () => {
    const { findByText } = render(
      <ThemeProvider theme={themes.dark}>
        <GameCard
          onRightAnswer={() => {}}
          onWrongAnswer={() => {}}
          onError={() => {}}
          disabled={false}
          questionNum={10}
          animationProgress={mockAnimationProgress as any}
          difficulty={DIFFICULTY_NAME.Easy}
        />
      </ThemeProvider>,
    );

    expect(await findByText("Correct Movie")).toBeTruthy();
    expect(await findByText("Wrong Movie 1")).toBeTruthy();
    expect(await findByText("Wrong Movie 2")).toBeTruthy();
  });

  it("should show loader when there is no question, and then remove loader when question appears", async () => {
    const { findByTestId, findByText, queryByTestId } = render(
      <ThemeProvider theme={themes.dark}>
        <GameCard
          onRightAnswer={() => {}}
          onWrongAnswer={() => {}}
          onError={() => {}}
          disabled={false}
          questionNum={10}
          animationProgress={mockAnimationProgress as any}
          difficulty={DIFFICULTY_NAME.Easy}
        />
      </ThemeProvider>,
    );
    expect(await findByTestId("question-loader")).toBeTruthy();
    expect(await findByText("Correct Movie")).toBeTruthy();
    expect(await queryByTestId("question-loader")).toBeNull();
  });

  test("calls right and wrong callbacks", async () => {
    const mockOnRightAnswer = jest.fn();
    const mockOnWrongAnswer = jest.fn();

    const { findByText } = render(
      <ThemeProvider theme={themes.dark}>
        <GameCard
          onRightAnswer={mockOnRightAnswer}
          onWrongAnswer={mockOnWrongAnswer}
          onError={() => {}}
          disabled={false}
          questionNum={0}
          animationProgress={mockAnimationProgress as any}
          difficulty={DIFFICULTY_NAME.Easy}
        />
      </ThemeProvider>,
    );
    // Find and press the correct answer button
    const correctButton = await findByText("Correct Movie");
    fireEvent.press(correctButton);
    expect(mockOnRightAnswer).toHaveBeenCalled();

    // Find and press the wrong answer button
    const wrongButton = await findByText("Wrong Movie 1");
    fireEvent.press(wrongButton);
    expect(mockOnWrongAnswer).toHaveBeenCalled();
  });

  test("handles errors with proper callback", async () => {
    (generateQuestion as jest.Mock).mockRejectedValue(new Error("API Error"));
    const mockOnError = jest.fn();

    render(
      <ThemeProvider theme={themes.dark}>
        <GameCard
          onRightAnswer={() => {}}
          onWrongAnswer={() => {}}
          onError={mockOnError}
          disabled={false}
          questionNum={0}
          animationProgress={mockAnimationProgress as any}
          difficulty={DIFFICULTY_NAME.Easy}
        />
      </ThemeProvider>,
    );
    await waitFor(() => {
      expect(mockOnError).toHaveBeenCalled();
    });
  });

  test("respects disabled prop", async () => {
    const mockOnRightAnswer = jest.fn();
    const mockOnWrongAnswer = jest.fn();

    const { findByText } = render(
      <ThemeProvider theme={themes.dark}>
        <GameCard
          onRightAnswer={mockOnRightAnswer}
          onWrongAnswer={mockOnWrongAnswer}
          onError={() => {}}
          disabled={true}
          questionNum={0}
          animationProgress={mockAnimationProgress as any}
          difficulty={DIFFICULTY_NAME.Easy}
        />
      </ThemeProvider>,
    );
    const correctButton = await findByText("Correct Movie");
    fireEvent.press(correctButton);
    const wrongButton = await findByText("Wrong Movie 1");
    fireEvent.press(wrongButton);
    await waitFor(() => {
      expect(mockOnRightAnswer).toHaveBeenCalledTimes(0);
      expect(mockOnWrongAnswer).toHaveBeenCalledTimes(0);
    });
  });
});
