import React, { Component } from 'react'
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ChooseDeviceScreenStyle'
import GetDeviceListTypes from '../Redux/GetDeviceListRedux'
import { Images } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import RenderListDevice from '../Components/RenderListDevice'

class ChooseDeviceScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      deviceName: ['HeartBeat'],
      data: [],
      userId: null,
      deviceData: []
    }
  }

  handleNavigate2 = (idDevice) => {
    this.props.navigation.navigate(
      'MonitorScreen',
      { idDevice: idDevice }
    )
  }
  openDrawer = () => {
    this.props.navigation.openDrawer()
  }
  renderItem = ({ item, index }) => {
    return (
      <RenderListDevice item={item} handleNavigate2={this.handleNavigate2}/>
    )
  }

  componentDidMount () {
    this.getData().then()
    this.props.onFetchDevice()
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userId')
      if (value !== null) {
        this.setState({
          userId: value
        })
      }
    } catch (e) {
      // error reading value
    }
  }
  saveDevice = async (nextProps, response) => {
    await response.data.map((item, index) => {
      if (item.user_id === this.state.userId) {
        this.state.deviceData.push(item)
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    const response = nextProps.deviceList.payload
    if (response != null) {
      this.saveDevice(nextProps, response).then()
    }
  }

  render () {
    return (
      <View>
        <ImageBackground source={Images.backgroundHeaderBar}
                         style={styles.backgroundHeaderBar}>
          <TouchableOpacity
            onPress={this.openDrawer}
            style={styles.menuIcon}
          >
            <Icon name="bars" size={30} color="#FFF"/>
          </TouchableOpacity>
          <Text style={styles.textName}>Choose your device</Text>
          <TouchableOpacity style={styles.bellIcon}>
            <Icon name="bell" size={25} color="#FFF"/>
          </TouchableOpacity>
        </ImageBackground>
        <Text style={styles.txDeviceList}>Device list:</Text>
        {this.state.deviceData.length !== 0 &&
        <FlatList
          data={this.state.deviceData}
          renderItem={this.renderItem}
        />}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    deviceList: state.deviceList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchDevice: () => {
      dispatch(GetDeviceListTypes.getDeviceListRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseDeviceScreen)
