

![The Movie Seer](https://i.imgur.com/H3CsGpP.png "The Movie Seer")
# The Movie Seer
The Movie Seer is a game by Evgeny Ivanitsky (me) developed with React Native for mobile phones. During the game, the player is shown a promotional photo or a still from a movie along with several movie titles - one of which matches the image. If the player selects the correct title, the game moves on to the next still. If they choose incorrectly, they lose a life, and when all lives are gone, the game ends.


The questions aren't prewritten, they are generated dynamically with the help of [The Movie Database](https://www.themoviedb.org/) and their API. 

The game was developed as a showcase - i wanted to make something that covered the entire React Native development pipeline. It’s not quite the size of a commercial product, of course, but it is still a fully featured React Native app.


![Gameplay](https://i.imgur.com/oA2jXDn.gif "Gameplay")
## Technologies used
- [**Expo**](https://expo.dev/) was used for faster testing and it's diverse collection of libraries,
- Written in [typescript](https://www.typescriptlang.org/)
- Automatic tests implemented with [Jest](https://jestjs.io/) and [React Native Testing Library](https://oss.callstack.com/react-native-testing-library/)
- Routing was done with [**react-navigation**](https://reactnavigation.org/),
- Information is pulled from TMDb with [**axios**](https://www.npmjs.com/package/axios),
- Animations are done with [**react-native-reanimated**](https://docs.swmansion.com/react-native-reanimated/),
- Adaptive styling with [**styled-components**](https://styled-components.com/) and [**react-native-size-matters**](https://www.npmjs.com/package/react-native-size-matters),
- Theming, with light and dark theme switchable at any time and realized with [**styled-components**](https://styled-components.com/),
- Persistence between sessions with [**async-storage**](https://www.npmjs.com/package/@react-native-async-storage/async-storage).
  
## Themes
The game supports light and dark themes, realized with [**styled-components**](https://styled-components.com/). By default, the app follows the system theme, but the user has an option to change it, too.

![Themes](https://i.imgur.com/LU67qnH.png "Themes")


## Adaptive styling
Thanks to [**react-native-size-matters**](https://www.npmjs.com/package/react-native-size-matters) the app will properly scale on any phone.

![Sizes](https://i.imgur.com/s7EL7oQ.png "Sizes")


## A couple more screenshots

![Screenshots 1](https://i.imgur.com/VJdkvQ0.png "Screenshots 1")
![Screenshots 2](https://i.imgur.com/DklJnp5.png "Screenshots 2")


## Animations
Animations where done with [**react-native-reanimated**](https://docs.swmansion.com/react-native-reanimated/). It allows to make very pretty animations very fast. I kept the animations lightweight, but I think they look great. Also, on the menu screen, The Wizard floats around and shows you some popular movies. I like the wizard a lot.

![The wizard](https://i.imgur.com/JMLYuCj.gif "The wizard")
