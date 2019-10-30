import React, { Component } from 'react'
import {
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  View,
  AsyncStorage
} from 'react-native'

import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  handleSignIn = () => {
    this.props.navigation.navigate('SignInScreen')
  }
  handleSignUp = () => {
    this.props.navigation.navigate('SignInScreen')
  }

  async componentDidMount () {
    await AsyncStorage.getItem('userToken').then((userToken) => {
      this.props.navigation.navigate(userToken ? 'Drawer' : 'LaunchScreen')
    })
  }

  render () {
    return (
      <ImageBackground source={Images.bgLaunch} style={styles.backgroundImage} resizeMode='stretch'>
        <Image source={Images.logoLaunch} style={styles.logoLaunch}/>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonStyle} onPress={this.handleSignIn}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle} onPress={this.handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }
}
