import React, { Component } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import PopUpFriend from '../Components/PopUpFriend'
// Styles
import styles from './Styles/SignInScreenStyle'
import { Images } from '../Themes'

class SignUpScreen extends Component {
  _handleGoBack = () => this.props.navigation.dispatch(NavigationActions.back())

  render () {
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
                placeholderTextColor='lightblue' />
            </View>
            <View style={styles.inputContainer}>
              <Image style={styles.inputIcon}
                source={Images.iconPassword} />
              <TextInput style={styles.inputs}
                placeholder='Mật khẩu'
                secureTextEntry
                underlineColorAndroid='transparent'
                placeholderTextColor='lightblue' />
            </View>
            <View style={styles.inputContainer}>
              <Image style={styles.inputIcon}
                source={Images.iconPassword} />
              <TextInput style={styles.inputs}
                placeholder='Nhập lại mật khẩu'
                secureTextEntry
                underlineColorAndroid='transparent'
                placeholderTextColor='lightblue' />
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
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)
