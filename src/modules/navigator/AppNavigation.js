import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginViewContainer from '../screens/login/LoginViewContainer';
import PlanetViewContainer from '../screens/planets/PlanetViewContainer';

// Root navigator is a StackNavigator
const UnauthorizedNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginViewContainer
    },
  },
  {initialRouteName: 'Login'},
);

const authorizedNavigator = createStackNavigator(
  {
    Planet: {
      screen: PlanetViewContainer,
    },
  },
  {initialRouteName: 'Planet'},
);

const AppNavigator = createSwitchNavigator(
  {
    unauth: {
      screen: UnauthorizedNavigator,
      navigationOptions: {
        headerShown: false,
      },
    }, // <----StackNavigator},
    auth: {
      screen: authorizedNavigator,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'unauth', //Set initial route controller from here
  },
);

export default createAppContainer(AppNavigator);
