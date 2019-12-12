import React, { Component } from 'react'
import {
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  View
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
      deviceData: [],
      refreshing: false,
    }
  }

  handleNavigate2 = (idDevice, para) => {
    this.props.navigation.navigate(
      'MonitorScreen', {
        idDevice: idDevice,
        paraRecent: para
      }
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

  async componentDidMount () {
    try {
      const value = await AsyncStorage.getItem('userCode')
      if (value !== null) {
        this.setState({userId:value})
        this.props.onFetchDevice(value)
      }
    } catch (e) {
      // error reading value
    }

  }

  saveDevice = async (nextProps, response) => {
    this.setState({deviceData:response})
  }

  componentWillReceiveProps (nextProps) {
    const response = nextProps.deviceList.payload
    if (response != null) {
      this.saveDevice(nextProps, response).then(
        this.setState({ refreshing: false })
      )
    }
  }

  _onRefresh = () => {
    this.setState({ refreshing: true })
    this.props.onFetchDevice(this.state.userId)
  }

  render () {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
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
        {this.props.deviceList.fetching && <ActivityIndicator size="large" color="#0000ff"/>}
      </ScrollView>
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
    onFetchDevice: (data) => {
      dispatch(GetDeviceListTypes.getDeviceListRequest(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseDeviceScreen)
