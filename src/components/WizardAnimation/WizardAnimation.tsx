import { useEffect, useState } from "react";
import { WizardContainer, Movie, MovieTint, Wizard, WizardTV } from "./layouts";
import staticGif from "@assets/static.gif";
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { scale } from "react-native-size-matters";
import { getSomeMovies } from "@/apiCalls/getSomeMovies";
import { TMovie } from "@/apiCalls/types";
import { ViewStyle } from "react-native";
import { useIsFocused } from "@react-navigation/native";

const wizardMoveRadius = scale(10);

// this is a little fun animation for the main menu: a wizard shows you some movies
// we get a bunch of popular movies from a random year and show them on tv.
export const WizardAnimation = ({ style }: { style?: ViewStyle }) => {
  const imageUrl = process.env.EXPO_PUBLIC_TMDB_SMALL_IMAGE_URL;

  const isVisible = useIsFocused();

  const [someMovies, setSomeMovies] = useState<TMovie[]>([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  // this effect pulls movies from TMDB
  useEffect(() => {
    getSomeMovies()
      .then(setSomeMovies)
      .catch(() => {
        //if this fails it's not really a big deal - it will just show static, which looks pretty good by itself
      });
  }, []);

  // this setInterval browses between movies. it goes in half-steps - while the val is *.5, static is on the screen
  useEffect(() => {
    if (someMovies.length === 0) return;
    const browseChannels = setInterval(() => {
      if (isVisible)
        setCurrentMovieIndex((i) => {
          const next = i + 0.5;
          return next >= someMovies.length ? 0 : next;
        });
    }, 4000);
    return () => clearInterval(browseChannels);
  }, [isVisible, someMovies.length]);

  const movieSource =
    currentMovieIndex % 1 > 0 || someMovies.length === 0
      ? staticGif
      : imageUrl + someMovies[currentMovieIndex].backdrop_path;

  // some reanimated code to add some animation to the wizard
  const spellProgress = useSharedValue(0);
  useEffect(() => {
    spellProgress.value = withRepeat(
      withTiming(1, {
        duration: 12000,
        easing: Easing.linear,
      }),
      0,
    );
  }, [spellProgress]);

  const wizardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${Math.abs(spellProgress.value - 0.5) * -10}deg` },
        {
          translateX:
            Math.cos(spellProgress.value * 2 * Math.PI) * wizardMoveRadius,
        },
        {
          translateY:
            Math.sin(spellProgress.value * 2 * Math.PI) * wizardMoveRadius,
        },
      ],
    };
  });

  return (
    <WizardContainer style={style}>
      <Wizard style={wizardStyle} />
      <Movie testID="movie-pic" source={movieSource} placeholder={staticGif} />
      <MovieTint />
      <WizardTV />
    </WizardContainer>
  );
};
