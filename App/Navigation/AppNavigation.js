import { createStackNavigator, createAppContainer } from 'react-navigation'
import ChooseDeviceScreen from '../Containers/ChooseDeviceScreen'
import MonitorScreen from '../Containers/MonitorScreen'
import ChatScreen from '../Containers/ChatScreen'
import SignInScreen from '../Containers/SignInScreen'
import MapScreen from '../Containers/MapScreen'
import FriendDetailScreen from '../Containers/FriendDetailScreen'
import SignUpScreen from '../Containers/SignUpScreen'
import styles from './Styles/NavigationStyles'
import DrawerNavigatorExample from '../Components/DrawerNav'
import LaunchScreen from '../Containers/LaunchScreen'
// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  ChooseDeviceScreen: { screen: ChooseDeviceScreen },
  LaunchScreen: { screen: LaunchScreen },
  MonitorScreen: { screen: MonitorScreen },
  ChatScreen: { screen: ChatScreen },
  SignInScreen: { screen: SignInScreen },
  MapScreen: { screen: MapScreen },
  FriendDetailScreen: { screen: FriendDetailScreen },
  SignUpScreen: { screen: SignUpScreen },
  Drawer: { screen: DrawerNavigatorExample }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
