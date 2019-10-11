import { createStackNavigator, createAppContainer } from 'react-navigation'
import SignInScreen from '../Containers/SignInScreen'
import MapScreen from '../Containers/MapScreen'
import FriendDetailScreen from '../Containers/FriendDetailScreen'
import SignUpScreen from '../Containers/SignUpScreen'
import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  SignInScreen: { screen: SignInScreen },
  MapScreen: { screen: MapScreen },
  FriendDetailScreen: { screen: FriendDetailScreen },
  SignUpScreen:{screen:SignUpScreen}
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'SignInScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
