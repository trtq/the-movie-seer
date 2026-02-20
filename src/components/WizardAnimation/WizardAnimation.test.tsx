import React from "react";
import staticGif from "@assets/static.gif";
import { render, act, waitFor } from "@testing-library/react-native";
import { WizardAnimation } from "./WizardAnimation";
import { getSomeMovies } from "@/apiCalls/getSomeMovies";

jest.mock("@/apiCalls/getSomeMovies");
jest.useFakeTimers();

describe("WizardAnimation", () => {
  const mockMovies = [
    { backdrop_path: "movie1.jpg" },
    { backdrop_path: "movie2.jpg" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (getSomeMovies as jest.Mock).mockResolvedValue(mockMovies);
  });

  test("fetches movies on mount", async () => {
    render(<WizardAnimation />);
    await waitFor(() => {
      expect(getSomeMovies).toHaveBeenCalledTimes(1);
    });
  });

  test("cycles through movies with interval", async () => {
    const { getByTestId } = render(<WizardAnimation />);

    // Wait for movies to load and first render to settle
    await waitFor(() => {
      const movie = getByTestId("movie-pic");
      expect(movie.props.source[0].uri).toBe(
        process.env.EXPO_PUBLIC_TMDB_SMALL_IMAGE_URL + "movie1.jpg",
      );
    });

    // static
    await act(async () => {
      jest.advanceTimersByTime(4000);
    });
    let movie = getByTestId("movie-pic");
    expect(movie.props.source[0]).toBe(staticGif);

    // movie 2
    await act(async () => {
      jest.advanceTimersByTime(4000);
    });
    movie = getByTestId("movie-pic");
    expect(movie.props.source[0].uri).toBe(
      process.env.EXPO_PUBLIC_TMDB_SMALL_IMAGE_URL + "movie2.jpg",
    );
  });

  test("shows static when API fails", async () => {
    (getSomeMovies as jest.Mock).mockRejectedValue(new Error("fail"));
    const { getByTestId } = render(<WizardAnimation />);
    await waitFor(() => {
      const movie = getByTestId("movie-pic");
      expect(movie.props.source[0]).toBe(staticGif);
    });
  });
});
