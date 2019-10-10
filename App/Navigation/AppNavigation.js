import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation'
import MapScreen from '../Containers/MapScreen'
import SignUpScreen from '../Containers/SignUpScreen'
import SignInScreen from '../Containers/SignInScreen'
import Loading from '../Components/Loading'
import FriendDetailScreen from '../Containers/FriendDetailScreen'
import styles from './Styles/NavigationStyles'
import AsyncStorage from '@react-native-community/async-storage'
import React, { Component } from 'react'
import { View } from 'react-native'

class AuthLoadingScreen extends Component {
  constructor () {
    super()
    this._bootstrapAsync().then()
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken')
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth')
  }
  // Render any loading content that you like here
  render () {
    return (
     <View style={styles.container}>
       <Loading/>
     </View>
    )
  }
}

const AppStack = createStackNavigator(
  {
    MapScreen: MapScreen,
    SignInScreen: SignInScreen,
    SignUpScreen: SignUpScreen,
    FriendDetailScreen:FriendDetailScreen
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerStyle: styles.header
    }
  }
)
const AuthStack = createStackNavigator(
  { SignInScreen: SignInScreen },
  {
    headerMode: 'none',
    navigationOptions: {
      headerStyle: styles.header
    }
  }
)

const PrimaryNav = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
    FriendDetailScreen:FriendDetailScreen
  },
  {
    initialRouteName: 'AuthLoading',
  }
))

// Manifest of possible screens
// const PrimaryNav = createStackNavigator({
//   MapScreen: { screen: MapScreen },
//   SignInScreen: { screen: SignInScreen },
//   SignUpScreen: { screen: SignUpScreen },
//   LaunchScreen: { screen: LaunchScreen }
// }, {
//   // Default config for all screens
//   headerMode: 'none',
//   initialRouteName: 'SignInScreen',
//   navigationOptions: {
//     headerStyle: styles.header
//   }
// })
//
export default PrimaryNav
