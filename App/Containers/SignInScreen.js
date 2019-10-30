import React, { Component } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import SignInTypes from '../Redux/SignInRedux'

import { NavigationActions, StackActions } from 'react-navigation'

//import components
import { api } from '../Sagas'
import PopUpFriend from '../Components/PopUpFriend'

// Styles
import styles from './Styles/SignInScreenStyle'
import { Images } from '../Themes'

class SignInScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '01255946496',
      password: '123456',
    }
  }

  componentDidMount () {
    AsyncStorage.getItem('userToken').then((userToken) => {
      this.props.navigation.navigate(userToken ? 'Drawer' : 'SignInScreen')
    })
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
    )
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
    )
  }

  _onChangeEmail = (text) => this.setState({ email: text })
  _onChangePassword = (text) => this.setState({ password: text })
  _handleAddData = () => this._addData(
    { email: this.state.email },
    { password: this.state.password }
  )
  _addData = (email, password) => {
    if (this.state.email === '' || this.state.password === '') {
      alert('You must be input email and password!!')
    } else {
      Keyboard.dismiss()
      this._handleSignIn(email, password).then()
    }
  }
  _handleSignIn = async (email, password) => {
    let data = {
      emailData: email,
      passwordData: password
    }
    try {
      await this.props.onFetchUser(data)
    } catch (e) {
      console.log(e)
    }
  }

  componentWillReceiveProps (nextProps) {
    let response = nextProps.user.payload
    console.log('-------', response)
    if (response != null) {
      this.saveUser(nextProps, response).then()
    }
  }

  saveUser = async (nextProps, response) => {
    api.api.setHeader('Authorization', `Bearer ${nextProps.user.payload.data.token}`)
    if (response.status_code === 200) {
      AsyncStorage.setItem('userToken', nextProps.user.payload.data.token)
      console.log('token user', nextProps.user.payload.data.token)
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Drawer' })]
      })
      nextProps.navigation.dispatch(resetAction)
    }
  }
  _handleSignUp = () => this.props.navigation.navigate('SignUpScreen')

  render () {
    let { email, password } = this.state
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
                           placeholderTextColor="lightblue"
                           onChangeText={this._onChangeEmail}
                           value={this.state.email}/>
              </View>
              <View style={styles.inputContainer}>
                <Image style={styles.inputIcon}
                       source={Images.iconPassword}/>
                <TextInput style={styles.inputs}
                           placeholder="Password"
                           secureTextEntry={true}
                           underlineColorAndroid='transparent'
                           placeholderTextColor="lightblue"
                           onChangeText={this._onChangePassword}
                           value={this.state.password}/>
              </View>
              <TouchableOpacity style={styles.forgotButton}>
                <Text style={styles.forgotText}>Forgot Password</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={this._handleAddData} style={styles.loginButton}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._handleSignUp} style={styles.footerButton}>
              <Text style={styles.signUpButton}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.signIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUser: (data) => {
      console.log('fetchUser')
      dispatch(SignInTypes.signInRequest(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)
