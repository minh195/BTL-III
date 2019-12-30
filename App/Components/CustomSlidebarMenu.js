import React, { Component } from 'react'
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'

import styles from './Styles/CustomSlidebarMenuStyle'
import Icon from 'react-native-vector-icons/FontAwesome'
import { DrawerActions, NavigationActions, StackActions } from 'react-navigation'
import PopUpLogOut from './PopUpLogOut'

export default class CustomSidebarMenu extends Component {
  constructor (props) {
    super(props)
    this.items = [
      {
        navOptionThumb: 'heartbeat',
        navOptionName: 'Danh sách Thiết bị',
        screenToNavigate: 'NavScreen1',
      },
      {
        navOptionThumb: 'comments',
        navOptionName: 'Trò chuyện',
        screenToNavigate: 'NavScreen2',
      },
      {
        navOptionThumb: 'map',
        navOptionName: 'Vị trí thiết bị',
        screenToNavigate: 'NavScreen3',
      },
    ]
    this.state = {
      avatar: null,
      email: ''
    }
  }

  _signOutAsync = async () => {
    global.currentScreenIndex = 0
    await this.props.navigation.dispatch(DrawerActions.closeDrawer())
    await this.refs.addModal1.showModal()
  }

  _HandleLogOut = async () => {
    await AsyncStorage.removeItem('userToken', () => {})
    await AsyncStorage.removeItem('avatar', () => {})
    await AsyncStorage.removeItem('email', () => {})
    await AsyncStorage.removeItem('userCode', () => {})
    await AsyncStorage.removeItem('typeUser', () => {})
    await AsyncStorage.removeItem('doctorCode', () => {})
    await AsyncStorage.removeItem('typeUser', () => {})
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'SignInScreen' })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  componentDidMount () {
    this.getData().then()
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('avatar')
      const value2 = await AsyncStorage.getItem('email')
      if (value !== null) {
        this.setState({
          avatar: value,
          email: value2
        })
      }
    } catch (e) {
      // error reading value
    }
  }
  onPressAvatar = () => {
    this.props.navigation.navigate('FriendDetailScreen')
  }

  render () {
    return (
      <View style={styles.sideMenuContainer}>
        <TouchableOpacity onPress={this.onPressAvatar}>
          <Image source={{ uri: this.state.avatar }}
                 style={styles.sideMenuProfileIcon}/>
        </TouchableOpacity>
        <View style={styles.textContent}>
          <Text style={styles.textEmail}>
            {this.state.email}
          </Text>
        </View>
        <View style={{ width: '100%' }}>
          {this.items.map((item, key) => (
            <View style={[styles.itemContainer,
              { backgroundColor: global.currentScreenIndex === key ? '#e0dbdb' : '#ffffff' }]}
                  key={key}>
              <View style={{ marginRight: 10, marginLeft: 20 }}>
                <Icon name={item.navOptionThumb} size={25} color={'#747375'}/>
              </View>
              <Text style={[styles.navigationName,
                { color: global.currentScreenIndex === key ? 'red' : 'black' }]}
                    onPress={() => {
                      global.currentScreenIndex = key
                      this.props.navigation.navigate(`${item.screenToNavigate}`)
                    }}>
                {item.navOptionName}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.buttonLogOut}>
          <TouchableOpacity onPress={this._signOutAsync}>
            <Icon size={30}
                  color={'red'}
                  name='sign-out'/>
          </TouchableOpacity>
        </View>
        <PopUpLogOut logout={this._HandleLogOut} ref={'addModal1'}/>
      </View>
    )
  }
}
