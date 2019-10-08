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
import styles from './Styles/SignInScreenStyle'
import { Images } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'
class SignUpScreen extends Component {
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
              <View style={styles.inputContainer}>
                <Image style={styles.inputIcon}
                       source={Images.iconPassword}/>
                <TextInput style={styles.inputs}
                           placeholder="Confirm password"
                           secureTextEntry={true}
                           underlineColorAndroid='transparent'
                           placeholderTextColor="lightblue"
                           onChangeText={(text) => this.setState({ password: text })}
                           value={this.state.password}
                />
              </View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this._addData({ email: this.state.email },
                  { password: this.state.password })}>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, marginTop: 28 }}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
          <View style={{marginRight:250}}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('SignInScreen')}>
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
