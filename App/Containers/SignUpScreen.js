import React, { Component } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
  TextInput,
} from 'react-native'
//import Style
import styles from './Styles/SignUpScreenStyle'
import { Images } from '../Themes'
import { NavigationActions } from 'react-navigation'

class SignUpScreen extends Component {
  constructor (props) {
    super(props)
  }

  _handleGoBack = () => this.props.navigation.dispatch(NavigationActions.back())

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.origamiBird}
                 source={Images.origamiBird}/>
        </View>
        <View style={styles.content}>
          <ImageBackground source={Images.backgroundLogin}
                           style={styles.imageBackgroundLogin}>
            <View style={styles.loginContainer}>
              <View style={styles.inputContainer}>
                <Image style={styles.inputIcon}
                       source={Images.iconUser}/>
                <TextInput style={styles.inputs}
                           placeholder="Email"
                           keyboardType="email-address"
                           underlineColorAndroid='transparent'
                           placeholderTextColor="lightblue"/>
              </View>
              <View style={styles.inputContainer}>
                <Image style={styles.inputIcon}
                       source={Images.iconPassword}/>
                <TextInput style={styles.inputs}
                           placeholder="Password"
                           secureTextEntry={true}
                           underlineColorAndroid='transparent'
                           placeholderTextColor="lightblue"/>
              </View>
              <View style={styles.inputContainer}>
                <Image style={styles.inputIcon}
                       source={Images.iconPassword}/>
                <TextInput style={styles.inputs}
                           placeholder="Confirm password"
                           secureTextEntry={true}
                           underlineColorAndroid='transparent'
                           placeholderTextColor="lightblue"/>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity>
                  <Text style={styles.signUpButton}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.footerContainer}>
            <TouchableOpacity onPress={this._handleGoBack}>
              <Image style={styles.goBackIcon}
                     source={Images.iconGoBack}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

export default SignUpScreen
