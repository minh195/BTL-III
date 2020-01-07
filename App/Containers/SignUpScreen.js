import React, { Component } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Keyboard
} from 'react-native'
import { connect } from 'react-redux'
// Styles
import styles from './Styles/SignInScreenStyle'
import { Images } from '../Themes'
import SignInTypes from '../Redux/SignInRedux'

class SignUpScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      rePassword: '',
      userData: [],
      message: ''
    }
  }

  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow'
    )
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide'
    )
  }

  _onChangeEmail = (text) => this.setState({ email: text })
  _onChangePassword = (text) => this.setState({ password: text })
  _onChangeRePassword = (text) => this.setState({ password: text })
  _handleAddData = () => this._addData(
    { email: this.state.email },
    { password: this.state.password }
  )
  _addData = (email, password) => {
    if (this.state.email === '' || this.state.password === '') {
      alert('Bạn cần nhập tên đăng nhập và mật khẩu!')
    } else {
      Keyboard.dismiss()
      this._handleSignUp(email, password).then()
    }
  }
  _handleSignUp = async (email, password) => {
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
    if (response != null) {
      this.saveUser(nextProps, response).then()
    }
  }
  saveUser = async (nextProps, response) => {
    let { email, password } = this.state

    // if (this.state.userData.length === 0) {
    //   this.setState({
    //     message: 'Sai tên tài khoản hoặc mật khẩu!'
    //   })
    // }
    // setTimeout(() => {
    //   this.setState({
    //     message: ''
    //   })
    // }, 2000)
  }
  _handleGoBack = () => this.props.navigation.goBack()

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.origamiBird}
            source={Images.origamiBird} />
        </View>
        <View style={styles.content}>
          <Image style={styles.avatarUser}
            source={Images.avatarUser} />
          <Image style={styles.topLoginFrom}
            source={Images.topLoginFrom} />
          <View style={styles.loginContainer}>
            <View style={styles.inputContainer}>
              <Image style={styles.inputIcon}
                source={Images.iconUser} />
              <TextInput style={styles.inputs}
                placeholder='Tên đăng nhập'
                keyboardType='email-address'
                underlineColorAndroid='transparent'
                placeholderTextColor='lightblue'
                onChangeText={this._onChangeEmail}
                value={this.state.email}
              />
            </View>
            <View style={styles.inputContainer}>
              <Image style={styles.inputIcon}
                source={Images.iconPassword} />
              <TextInput style={styles.inputs}
                placeholder='Mật khẩu'
                secureTextEntry
                underlineColorAndroid='transparent'
                placeholderTextColor='lightblue'
                onChangeText={this._onChangePassword}
                value={this.state.password}
              />
            </View>
            <View style={styles.inputContainer}>
              <Image style={styles.inputIcon}
                source={Images.iconPassword} />
              <TextInput style={styles.inputs}
                placeholder='Nhập lại mật khẩu'
                secureTextEntry
                underlineColorAndroid='transparent'
                placeholderTextColor='lightblue'
                onChangeText={this._onChangeRePassword}
                value={this.state.rePassword}
              />
            </View>
          </View>
          <TouchableOpacity onPress={this._handleAddData} style={styles.SignUpButton}>
            <Text style={styles.loginText}>Đăng kí</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._handleGoBack} style={styles.footerIcon}>
            <Image style={styles.goBackIcon}
              source={Images.iconGoBack} />
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
      dispatch(SignInTypes.signInRequest(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)
