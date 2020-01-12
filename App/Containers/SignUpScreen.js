import React, { Component } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Alert, ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
// Styles
import styles from './Styles/SignInScreenStyle'
import { Images } from '../Themes'
import SignInTypes from '../Redux/SignInRedux'
import SignUpTypes from '../Redux/SignUpRedux'

class SignUpScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      rePassword: '',
      userData: [],
      message: '',
      isSameUsername: false,
      isSuccess: false
    }
  }

  componentDidMount () {
    try {
      this.props.onFetchUser()
    } catch (e) {
      console.log(e)
    }
  }

  _onChangeEmail = (text) => this.setState({ email: text })
  _onChangePassword = (text) => this.setState({ password: text })
  _onChangeRePassword = (text) => this.setState({ rePassword: text })

  _handleAddData = () => {
    if (this.state.email === '' || this.state.password === '') {
      Alert.alert(
        'Thông báo',
        'Bạn cần nhập tên đăng nhập và mật khẩu!',
        [
          { text: 'OK' }
        ],
        { cancelable: true }
      )
    } else if (this.state.email.length < 6 || this.state.password < 6) {
      Alert.alert(
        'Thông báo',
        'Tên đăng nhập mật khẩu có 6 kí tự trở lên!',
        [
          { text: 'OK' }
        ],
        { cancelable: true }
      )
    } else {
      if (this.state.password !== this.state.rePassword) {
        Alert.alert(
          'Thông báo',
          'Mật khẩu bạn nhập không trùng nhau!',
          [
            { text: 'OK' }
          ],
          { cancelable: true }
        )
      } else {
        this._handleSignUp()
      }
    }
  }
  _handleSignUp = () => {
    if (this.state.userData.indexOf(this.state.email) === -1) {
      this.props.onSignUp({
        user_name: this.state.email,
        password: this.state.password
      })
      if (this.state.isSuccess) {
        Alert.alert(
          'Thông báo',
          'Bạn đã đăng kí thành công!',
          [
            { text: 'OK',
              onPress: () => this.props.navigation.navigate('SignInScreen',
                {username: this.state.email}) }
          ],
          { cancelable: false }
        )
      }
    } else {
      Alert.alert(
        'Thông báo',
        'Tên đăng nhập đã bị trùng!',
        [
          { text: 'OK' }
        ],
        { cancelable: true }
      )
    }
  }

  componentWillReceiveProps (nextProps) {
    let response = nextProps.user.payload
    if (response != null) {
      response.map((item, index) => {
        this.state.userData.push(item.user_name)
      })
    }
    let responseSignUp = nextProps.signUp.payload
    if (responseSignUp != null) {
      this.setState({
        isSuccess: true
      })
    }
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
          <TouchableOpacity onPress={this._handleAddData}
            style={styles.loginButton}
            disabled={this.props.user.fetching}
          >
            {(!this.props.user.fetching && !this.props.signUp.fetching) &&
            <Text style={styles.loginText}>Đăng kí</Text>}
            {(this.props.user.fetching || this.props.signUp.fetching) &&
            <ActivityIndicator size='small' color='white' />}
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
    user: state.signIn,
    signUp: state.signUp
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUser: () => {
      dispatch(SignInTypes.signInRequest())
    },
    onSignUp: (data) => {
      dispatch(SignUpTypes.signUpRequest(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)
