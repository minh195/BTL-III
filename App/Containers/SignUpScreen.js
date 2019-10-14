import React, { Component } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions, StackActions } from 'react-navigation'
import PopUpFriend from '../Components/PopUpFriend'
// Styles
import styles from './Styles/SignInScreenStyle'
import { Images } from '../Themes'

class SignUpScreen extends Component {
  constructor (props) {
    super(props)
  }

  _handleGoBack = () => this.props.navigation.dispatch(NavigationActions.back())

  render () {
    return (
      <KeyboardAvoidingView style={styles.keyBoardAvoidingView} behavior="height">
        <View style={styles.container}>
          <PopUpFriend ref={'addModal'}/>
          <View style={styles.header}>
            <Image style={styles.origamiBird}
                   source={Images.origamiBird}/>
          </View>
          <View style={styles.content}>
            <Image style={styles.avatarUser}
                   source={Images.avatarUser}/>
            <Image style={styles.topLoginFrom}
                   source={Images.topLoginFrom}/>
            <View style={styles.loginContainer}>
              <View style={styles.inputContainer}>
                <Image style={styles.inputIcon}
                       source={Images.iconUser}/>
                <TextInput style={styles.inputs}
                           placeholder="Email address"
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
                           placeholder="Password"
                           secureTextEntry={true}
                           underlineColorAndroid='transparent'
                           placeholderTextColor="lightblue"/>
              </View>
              <TouchableOpacity style={styles.forgotButton}>
                <Text style={styles.forgotText}>Forgot Password</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={this._handleAddData} style={styles.loginButton}>
              <Text style={styles.loginText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._handleGoBack} style={styles.footerIcon}>
              <Image style={styles.goBackIcon}
                     source={Images.iconGoBack}/>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)
