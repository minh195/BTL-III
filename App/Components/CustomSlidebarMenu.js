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
    await AsyncStorage.clear()
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

  render () {
    return (
      <View style={styles.sideMenuContainer}>
        <Image source={{ uri: this.state.avatar }}
               style={styles.sideMenuProfileIcon}/>
        <View style={{
          borderBottomWidth: 1,
          borderBottomColor: '#e2e2e2',
          paddingBottom: 10,
          width: '100%',
          marginBottom: 10,
          alignItems: "center"
        }}>
          <Text style={{
            marginTop: 5,
            paddingHorizontal: 20,
            textAlign: "center"
          }}>
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
