import axios from "axios";
import { generateQuestion } from "./generateQuestion";
import { getSomeMovies } from "./getSomeMovies";
import { DIFFICULTY_NAME } from "@/utils/difficulties/types";
import { DIFFICULTIES } from "@/utils/difficulties/difficulties";

jest.mock("axios");

describe("API Calls", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(global.Math, "random").mockReturnValue(0.5);
  });

  describe("getSomeMovies", () => {
    const mockMovies = [
      {
        id: 1,
        title: "Movie 1",
        backdrop_path: "/path1.jpg",
      },
      {
        id: 2,
        title: "Movie 2",
        backdrop_path: "/path2.jpg",
      },
    ];

    test("fetches and returns movies successfully", async () => {
      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: { results: mockMovies },
      });

      const result = await getSomeMovies();

      expect(result).toEqual(mockMovies);
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining("/discover/movie"),
        expect.objectContaining({
          headers: {
            Authorization: expect.stringContaining("Bearer"),
          },
        }),
      );
    });

    test("throws error when API response status is not successful", async () => {
      (axios.get as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

      await expect(getSomeMovies()).rejects.toThrow();
    });

    test("throws error when results are empty", async () => {
      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: { results: null },
      });

      await expect(getSomeMovies()).rejects.toEqual("movies not found");
    });

    test("includes correct query parameters", async () => {
      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: { results: mockMovies },
      });

      await getSomeMovies();

      const callArgs = (axios.get as jest.Mock).mock.calls[0][0];
      expect(callArgs).toContain("include_adult=false");
      expect(callArgs).toContain("include_video=false");
      expect(callArgs).toContain("language=en-US");
      expect(callArgs).toContain("sort_by=vote_count.desc");
      expect(callArgs).toContain("primary_release_year=");
      expect(callArgs).toContain("with_original_language=en");
    });
  });

  describe("generateQuestion", () => {
    const mockRandomMovies = [
      {
        id: 1,
        title: "Movie 1",
        backdrop_path: "/path1.jpg",
      },
    ];

    const mockSimilarMovies = [
      { id: 2, original_title: "Similar Movie 1" },
      { id: 3, original_title: "Similar Movie 2" },
      { id: 4, original_title: "Similar Movie 3" },
      { id: 5, original_title: "Similar Movie 4" },
    ];

    test("generates a valid question with correct difficulty settings", async () => {
      (axios.get as jest.Mock)
        .mockResolvedValueOnce({
          status: 200,
          data: { results: mockRandomMovies },
        })
        .mockResolvedValueOnce({
          status: 200,
          data: { results: mockSimilarMovies },
        });

      const question = await generateQuestion(DIFFICULTY_NAME.Easy);

      expect(question.id).toBe(mockRandomMovies[0].id);
      expect(question.picture).toContain("path1.jpg");
      expect(question.answers).toHaveLength(
        DIFFICULTIES[DIFFICULTY_NAME.Easy].results,
      );
      expect(question.answers.filter((a) => a.correct).length).toBe(1);
      expect(question.answers.filter((a) => !a.correct).length).toBe(
        DIFFICULTIES[DIFFICULTY_NAME.Easy].results - 1,
      );
    });

    test("ensures correct answer is in the answers list", async () => {
      (axios.get as jest.Mock)
        .mockResolvedValueOnce({
          status: 200,
          data: { results: mockRandomMovies },
        })
        .mockResolvedValueOnce({
          status: 200,
          data: { results: mockSimilarMovies },
        });

      const question = await generateQuestion(DIFFICULTY_NAME.Normal);

      const correctAnswer = question.answers.find((a) => a.correct);
      expect(correctAnswer).toBeDefined();
      expect(correctAnswer!.id).toBe(mockRandomMovies[0].id);
      expect(correctAnswer!.name).toBe(mockRandomMovies[0].title);
    });

    test("throws error when initial movie search returns no results", async () => {
      (axios.get as jest.Mock).mockResolvedValueOnce({
        status: 200,
        data: { results: [] },
      });

      await expect(generateQuestion(DIFFICULTY_NAME.Easy)).rejects.toEqual(
        "no results",
      );
    });

    test("throws error when similar movies search is unsuccessful", async () => {
      (axios.get as jest.Mock)
        .mockResolvedValueOnce({
          status: 200,
          data: { results: mockRandomMovies },
        })
        .mockResolvedValueOnce({
          status: 500,
          data: null,
        });

      await expect(generateQuestion(DIFFICULTY_NAME.Easy)).rejects.toEqual(
        "result for a similar movie search are incorrect",
      );
    });

    test("throws error when initial movie search is unsuccessful", async () => {
      (axios.get as jest.Mock).mockResolvedValueOnce({
        status: 500,
        data: null,
      });

      await expect(generateQuestion(DIFFICULTY_NAME.Easy)).rejects.toEqual(
        "results are incorrect",
      );
    });

    test("recursively calls itself when similar movies count is insufficient", async () => {
      const insufficientSimilar = [{ id: 2, title: "Similar Movie 1" }];

      (axios.get as jest.Mock)
        // First call - insufficient similar
        .mockResolvedValueOnce({
          status: 200,
          data: { results: mockRandomMovies },
        })
        .mockResolvedValueOnce({
          status: 200,
          data: { results: insufficientSimilar },
        })
        // Recursive call - sufficient similar
        .mockResolvedValueOnce({
          status: 200,
          data: { results: mockRandomMovies },
        })
        .mockResolvedValueOnce({
          status: 200,
          data: { results: mockSimilarMovies },
        });

      const question = await generateQuestion(DIFFICULTY_NAME.Easy);

      expect(question.answers.length).toBe(
        DIFFICULTIES[DIFFICULTY_NAME.Easy].results,
      );
      expect(axios.get).toHaveBeenCalledTimes(4);
    });
  });
});
