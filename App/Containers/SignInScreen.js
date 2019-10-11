import React, { Component } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
  TextInput,
  Keyboard,
} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import SignInTypes from '../Redux/SignInRedux'
import AsyncStorage from '@react-native-community/async-storage'
// Styles
import styles from './Styles/SignInScreenStyle'
import { Images } from '../Themes'
import { api } from '../Sagas'
import PopUpFriend from '../Components/PopUpFriend'
import resetAction, {NavigationActions,StackActions} from 'react-navigation'
import MapScreen from './MapScreen'

class SignInScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '01255946496',
      password: '123456',
    }
  }

  _addData = (email, password) => {
    if (this.state.email === '' || this.state.password === '') {
      alert('You must be input email and password!!')
    } else {
      Keyboard.dismiss()
      this._handleSignIn(email, password).then(r => {})
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
        actions: [NavigationActions.navigate({routeName: 'MapScreen'})]
      })
      nextProps.navigation.dispatch(resetAction)
    } else {
      alert('Username or password is un correct!')
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
  async componentDidMount () {
    await AsyncStorage.getItem('userToken').then((userToken) => {
      this.props.navigation.navigate(userToken ? 'MapScreen': 'SignInScreen')
    })

    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
    )
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
    )
  }

  componentWillUnmount () {
   // this.keyboardDidShowListener.remove()
   // this.keyboardDidHideListener.remove()
  }

  render () {
    let { email, password } = this.state

    return (
      <View style={styles.container}>
        <PopUpFriend ref={'addModal'}/>
        <View style={styles.header}>
          <Image style={styles.origamiBird}
                 source={Images.origamiBird}/>
        </View>
        <View style={styles.content}>
          <ImageBackground source={Images.backgroundLogin}
                           style={{ height: 350, width: 300 }}>
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', marginTop: 120 }}>
              <View style={styles.inputContainer}>
                <Image style={styles.inputIcon}
                       source={Images.iconUser}/>
                <TextInput style={styles.inputs}
                           placeholder="Email address"
                           keyboardType="email-address"
                           underlineColorAndroid='transparent'
                           placeholderTextColor="lightblue"
                           onChangeText={(text) => this.setState({ email: text })}
                           value={this.state.email}
                />
              </View>
              <View style={styles.inputContainer}>
                <Image style={styles.inputIcon}
                       source={Images.iconPassword}/>
                <TextInput style={styles.inputs}
                           placeholder="Password"
                           secureTextEntry={true}
                           underlineColorAndroid='transparent'
                           placeholderTextColor="lightblue"
                           onChangeText={(text) => this.setState({ password: text })}
                           value={this.state.password}
                />
              </View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity>
                  <Text style={{ color: 'gray', marginLeft: 140, fontSize: 12, marginBottom: 55 }}>Forgot
                    Password</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this._addData({ email: this.state.email },
                  { password: this.state.password })}>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, marginTop: 14 }}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
          <TouchableOpacity onPress={() =>
            this.props.navigation.navigate('SignUpScreen')
          }>
            <Text style={{ color: '#73d0e2', fontSize: 16, marginTop: 30 }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
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
