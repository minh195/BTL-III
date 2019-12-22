import React, { Component } from 'react'
import {
  View,
  Dimensions,
} from 'react-native'
import { createDrawerNavigator, DrawerActions } from 'react-navigation'
import UserChatScreen from '../Containers/UserChatScreen'
import MapScreen from '../Containers/MapScreen'
import CustomSidebarMenu from './CustomSlidebarMenu'
import ChooseDeviceScreen from '../Containers/ChooseDeviceScreen'

global.currentScreenIndex = 0

class NavigationDrawerStructure extends Component {
  constructor (props) {
    super(props)
  }

  toggleDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.toggleDrawer())
  }

  render () {
    return (
      <View style={{ flexDirection: 'row' }}>
      </View>
    )
  }
}

const DrawerNavigatorExample = createDrawerNavigator(
  {
    NavScreen1: {
      screen: ChooseDeviceScreen,
    },
    NavScreen2: {
      screen: UserChatScreen,
    },
    NavScreen3: {
      screen: MapScreen,
    }
  },
  {
    contentComponent: CustomSidebarMenu,
    //Sidebar width
    drawerWidth: Dimensions.get('window').width - 130,
    initialRouteName: 'NavScreen1'
  }
)
export default DrawerNavigatorExample

