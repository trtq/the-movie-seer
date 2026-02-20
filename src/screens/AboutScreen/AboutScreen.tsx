import { TQuizNavigatorStackParamList, SCREENS } from "@/router/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  DateText,
  InfoButton,
  InfoButtonIcon,
  InfoButtonText,
  InfoText,
  InfoWrap,
  NameText,
  TextHighlight,
  TMDBBlock,
  TMDBLogo,
  TMDBText,
} from "./layouts";
import { Linking } from "react-native";
import { BackButton } from "@/components/BackButton/BackButton";
import { SafeContainer } from "@/components/SafeContainer/SafeContainer";

export const AboutScreen = ({
  navigation,
}: NativeStackScreenProps<TQuizNavigatorStackParamList, SCREENS.About>) => {
  return (
    <SafeContainer>
      <BackButton onPress={navigation.goBack} />
      <InfoWrap>
        <InfoText>
          <TextHighlight>The Movie Seer</TextHighlight> is a game that tests
          your knowledge of movies. Questions get generated automatically, so
          you can play forever (even if some answers don&apos;t really make
          sense).
          {"\n"}Made in React Native.
        </InfoText>
        <InfoText>
          Infromation about technologies used is available on my github.
        </InfoText>
        <InfoButton
          onPress={() =>
            Linking.openURL("https://github.com/trtq/the-movie-seer")
          }
        >
          <InfoButtonText>
            Source code <InfoButtonIcon name="github" />
          </InfoButtonText>
        </InfoButton>
        <InfoButton
          onPress={() =>
            Linking.openURL("https://www.linkedin.com/in/evgeny-ivanitsky")
          }
        >
          <InfoButtonText>
            My LinkedIn <InfoButtonIcon name="linkedin-square" />
          </InfoButtonText>
        </InfoButton>
        <NameText>© Evgeniy &quot;trtq&quot; Ivanitsky</NameText>
        <DateText>February 2026</DateText>
      </InfoWrap>
      <TMDBBlock>
        <TMDBLogo />
        <TMDBText>
          This product uses the TMDb API but is not endorsed or certified by
          TMDb
        </TMDBText>
      </TMDBBlock>
    </SafeContainer>
  );
};
