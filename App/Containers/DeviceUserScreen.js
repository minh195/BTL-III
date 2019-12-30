import React, { Component } from 'react'
import {
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/ChooseDeviceScreenStyle'
import GetDeviceListTypes from '../Redux/GetDeviceListRedux'
import { Images } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import RenderListDevice from '../Components/RenderListDevice'
import NoData from '../Components/NoData'

class DeviceUserScreen extends Component {
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

  handleNavigate2 = (idDevice, para, dateTimeRecent) => {
    this.props.navigation.navigate(
      'MonitorScreen', {
        idDevice: idDevice,
        paraRecent: para,
        dateTime: dateTimeRecent
      }
    )
  }

  goBack = () => {
    this.props.navigation.goBack()
  }
  renderItem = ({ item, index }) => {
    return (
      <RenderListDevice item={item}
                        handleNavigate2={this.handleNavigate2}
      />
    )
  }

  componentDidMount () {
    this.props.onFetchDevice(this.props.navigation.getParam('userCode'))
  }

  saveDevice = async (nextProps, response) => {
    this.setState({ deviceData: response })
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
      <ScrollView style={{ backgroundColor: '#F3F5F7' }}>
        <ImageBackground source={Images.backgroundHeaderBar}
                         style={styles.backgroundHeaderBar}>
          <TouchableOpacity
            onPress={this.goBack}
            style={styles.menuIcon}
          >
            <Icon name="arrow-left" size={30} color="#FFF"/>
          </TouchableOpacity>
          <Text style={styles.textName}>Danh sách thiết bị</Text>
          <TouchableOpacity style={styles.bellIcon}>
            {/*<Icon name="bell" size={25} color="#FFF"/>*/}
          </TouchableOpacity>
        </ImageBackground>
        <Text style={styles.txDeviceList}>Danh sách:</Text>
        <FlatList
          data={this.state.deviceData}
          renderItem={this.renderItem}
        />
        {(this.state.deviceData.length === 0 && !this.props.deviceList.fetching) && <NoData/>}
        {this.props.deviceList.fetching && <ActivityIndicator size="large" color="#0000ff"/>}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    deviceList: state.deviceList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchDevice: (data) => {
      dispatch(GetDeviceListTypes.getDeviceListRequest(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceUserScreen)
