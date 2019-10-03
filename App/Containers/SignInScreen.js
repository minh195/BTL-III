import React, { Component } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
  TextInput,
  Keyboard
} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import SignInTypes from '../Redux/SignInRedux'
// Styles
import styles from './Styles/SignInScreenStyle'
import { Images } from '../Themes'

class SignInScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  _addData = (email, password) => {
    if (this.state.email === '' || this.state.password === '') {
      alert('You must be input email and password!!')
    } else {
      Keyboard.dismiss()
      this._handleSignIn(email, password)
      console.log(email)
      console.log(password)
    }
  }
  _handleSignIn = (email, password) => {
    let data = {
      emailData: email,
      passwordData: password
    }
    try {
      this.props.onFetchUser(data)

    } catch (e) {
      console.log(e)
    }
  }
  submitAndClear = () => {
    this.setState({
      text: ''
    })
  }

  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
    )
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
    )
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  render () {
    let { email, password } = this.state
    console.log(this.props.user.payload)
    return (
      <View style={styles.container}>
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
                           placeholder="Email"
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
                  <Text style={{ color: 'gray', marginLeft: 100, fontSize: 12, marginBottom: 55 }}>Forgot
                    Password</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this._addData({ email: this.state.email },
                  { password: this.state.password })}>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, marginTop: 16 }}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
          <TouchableOpacity>
            <Text style={{ color: '73d0e2', fontSize: 16, marginTop: 30 }}>Sign Up</Text>
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
