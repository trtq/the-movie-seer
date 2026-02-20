

![The Movie Seer](https://i.imgur.com/H3CsGpP.png "The Movie Seer")
# The Movie Seer
The Movie Seer is a game by Evgeny Ivanitsky (me) developed with React Native for mobile phones. During the game the player is shown a promotional photo or a still from a movie and several movie titles, one of which corresponds with the still. If the player pinpoints the correct title, the game moves on to the next still, if they don't, they lose a life, or, if the lives run out, they lose the game. The questions aren't prewritten, they are generated with the help of [The Movie Database](https://www.themoviedb.org/) And their API.

The game was developed as a showcase - i wanted to make something that would include the entire React Native development pipeline. It isn't the size of a huge commercial project, obviously, but it is still a fully featured React Native app, with such things as:
- [**Expo**](https://expo.dev/) was used for faster testing and their diverse collection of libraries,
- Routing was done with [**react-navigation**](https://reactnavigation.org/),
- Information is pulled from TMDb with [**axios**](https://www.npmjs.com/package/axios),
- Animations are done with fantastic [**react-native-reanimated**](https://docs.swmansion.com/react-native-reanimated/),
- Adaptive styling with [**styled-components**](https://styled-components.com/) and [**react-native-size-matters**](https://www.npmjs.com/package/react-native-size-matters),
- Theming, with light and dark theme switchable at any time and realized with [**styled-components**](https://styled-components.com/),
- Persistence between sessions with [**async-storage**](https://www.npmjs.com/package/@react-native-async-storage/async-storage).

![Gameplay](https://i.imgur.com/oA2jXDn.gif "Gameplay")


## Themes
![Themes](https://i.imgur.com/LU67qnH.png "Themes")


## Adaptive styling
![Sizes](https://i.imgur.com/s7EL7oQ.png "Sizes")


## A couple more screenshots
![Screenshots 1](https://i.imgur.com/VJdkvQ0.png "Screenshots 1")
![Screenshots 2](https://i.imgur.com/DklJnp5.png "Screenshots 2")


## Animations
Animations where done with [**react-native-reanimated**](https://docs.swmansion.com/react-native-reanimated/). It allows to make very pretty animations very fast. I kept it economical, byt i think it looks very good. The game smoothly reacts to user's actions. On the menu screen, The Wizard floats around and shows you some popular movies. I like the wizard a lot.

![The wizard](https://i.imgur.com/JMLYuCj.gif "The wizard")
