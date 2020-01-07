import React, { Component } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  AsyncStorage,
  ActivityIndicator,
  CheckBox
} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import SignInTypes from '../Redux/SignInRedux'

import { NavigationActions, StackActions } from 'react-navigation'

// import components
import { api } from '../Sagas'
import PopUpFriend from '../Components/PopUpFriend'

// Styles
import styles from './Styles/SignInScreenStyle'
import { Images } from '../Themes'
import DoctorTypes from '../Redux/DoctorRedux'

class SignInScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      userData: [],
      isDoctor: false,
      message: ''
    }
  }

  componentDidMount () {
    AsyncStorage.getItem('userToken').then((userToken) => {
      this.props.navigation.navigate(userToken ? 'Drawer' : 'SignInScreen')
    })
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow'
    )
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide'
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
      alert('Bạn cần nhập tên đăng nhập và mật khẩu!')
    } else {
      Keyboard.dismiss()
      if (this.state.isDoctor) this.handleSignForDoctor()
      else this._handleSignIn(email, password).then()
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
  handleSignForDoctor = async (email, password) => {
    let data = {
      emailData: email,
      passwordData: password
    }
    try {
      await this.props.onFetchDoctor(data)
    } catch (e) {
      console.log(e)
    }
  }

  componentWillReceiveProps (nextProps) {
    let response = this.state.isDoctor ? nextProps.doctor.payload : nextProps.user.payload
    if (response != null) {
      this.saveUser(nextProps, response).then()
    }
  }

  onChangeDoctor = () => {
    this.setState({
      isDoctor: !this.state.isDoctor
    })
  }
  saveUser = async (nextProps, response) => {
    let { email, password } = this.state
    await response.map(async (item, index) => {
      if (item.user_name === email && item.password === password) {
        this.setState({
          userData: item
        })
        api.api.setHeader('Authorization', `Bearer ${item.token}`)
        await AsyncStorage.setItem('userToken', item.token)
        await AsyncStorage.setItem('avatar', item.avatar)
        await AsyncStorage.setItem('email', item.email)
        if (this.state.isDoctor === false) {
          await AsyncStorage.setItem('userCode', item.user_code.toString())
          await AsyncStorage.setItem('doctorCode', item.doctor_code.toString())
        }
        if (this.state.isDoctor) {
          await AsyncStorage.setItem('typeUser', 'doctor')
          await AsyncStorage.setItem('doctorCode', item.doctor_code.toString())
        } else await AsyncStorage.setItem('typeUser', 'user')
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Drawer' })]
        })
        nextProps.navigation.dispatch(resetAction)
      }
    })
    if (this.state.userData.length === 0) {
      this.setState({
        message: 'Sai tên tài khoản hoặc mật khẩu!'
      })
    }
    setTimeout(() => {
      this.setState({
        message: ''
      })
    }, 2000)
  }
  _handleSignUp = () => this.props.navigation.navigate('SignUpScreen')

  render () {
    const renderLoginText = () => {
      if (!this.props.user.fetching && !this.props.doctor.fetching) { return (<Text style={styles.loginText}>Đăng nhập</Text>) }
    }
    return (
      <View style={styles.container}>
        <PopUpFriend ref={'addModal'} />
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
                value={this.state.email} />
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
                value={this.state.password} />
            </View>
            <TouchableOpacity style={styles.checkBox}
              onPress={this.onChangeDoctor}
            >
              <CheckBox
                value={this.state.isDoctor}
                onValueChange={this.onChangeDoctor}
              />
              <Text style={[styles.forgotText, { color: this.state.isDoctor ? '#73d0e2' : 'gray' }]}>Dành cho Bác
                sĩ</Text>
            </TouchableOpacity>
            {this.state.message !== '' && <Text style={styles.messageText}>
                {this.state.message}
              </Text>}
          </View>
          <TouchableOpacity onPress={this._handleAddData} style={styles.loginButton}>
            {this.props.doctor.fetching && <ActivityIndicator size='small' color='white' />}
            {renderLoginText()}
            {this.props.user.fetching && <ActivityIndicator size='small' color='white' />}
          </TouchableOpacity>
          <TouchableOpacity onPress={this._handleSignUp} style={styles.footerButton}>
            <Text style={styles.signUpButton}>Đăng kí</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.signIn,
    doctor: state.doctor
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUser: (data) => {
      dispatch(SignInTypes.signInRequest(data))
    },
    onFetchDoctor: (data) => {
      dispatch(DoctorTypes.doctorRequest(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)
