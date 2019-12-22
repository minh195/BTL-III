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
} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ChooseDeviceScreenStyle'
import GetDeviceListTypes from '../Redux/GetDeviceListRedux'
import GetUserByDoctorTypes from '../Redux/GetUserByDoctorRedux'
import { Images } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import RenderListDevice from '../Components/RenderListDevice'
import RenderListUser from '../Components/RenderListUser'

class ChooseDeviceScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      deviceName: ['HeartBeat'],
      data: [],
      userId: null,
      deviceData: [],
      userData: [],
      refreshing: false,
      doctorId: null,
      isDoctor: false
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
  handleNavigateToDevice = (id) => {
    this.props.navigation.navigate(
      'DeviceUserScreen', {
        userCode: id
      }
    )
  }
  openDrawer = () => {
    this.props.navigation.openDrawer()
  }
  renderItem = ({ item, index }) => {
    return (
      <RenderListDevice item={item}
                        handleNavigate2={this.handleNavigate2}
      />
    )
  }
  renderItemUser = ({ item, index }) => {
    return (
      <RenderListUser item={item}
                      handleNavigateToDevice={this.handleNavigateToDevice}
      />
    )
  }

  async componentDidMount () {
    console.log("get Param: ", this.props.navigation.getParam('userCode'))
    const type = await AsyncStorage.getItem('typeUser')
    if (type === 'doctor') {
      const value = await AsyncStorage.getItem('doctorCode')
      if (value !== null) {
        this.setState({
          doctorId: value,
          isDoctor: true
        })
        this.props.onFetchUser(value)
      }
    } else {
      try {
        const value = await AsyncStorage.getItem('userCode')
        if (value !== null) {
          this.setState({ userId: value })
          this.props.onFetchDevice(value)
        }
      } catch (e) {
        // error reading value
      }
    }
  }

  saveDevice = async (nextProps, response) => {
    this.setState({ deviceData: response })
  }
  saveUser = async (nextProps, response) => {
    this.setState({ userData: response })
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.isDoctor) {
      const response = nextProps.user.payload
      if (response != null) {
        this.saveUser(nextProps, response).then(
          this.setState({ refreshing: false })
        )
      }
    } else {
      const response = nextProps.deviceList.payload
      if (response != null) {
        this.saveDevice(nextProps, response).then(
          this.setState({ refreshing: false })
        )
      }
    }
  }

  _onRefresh = () => {
    this.setState({ refreshing: true })
    this.props.onFetchDevice(this.state.userId)
    this.props.onFetchUser(this.state.doctorId)
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
        style={{ backgroundColor: '#F3F5F7' }}
      >
        <ImageBackground source={Images.backgroundHeaderBar}
                         style={styles.backgroundHeaderBar}>
          <TouchableOpacity
            onPress={this.openDrawer}
            style={styles.menuIcon}
          >
            <Icon name="bars" size={30} color="#FFF"/>
          </TouchableOpacity>
          {!this.state.isDoctor && <Text style={styles.textName}>Danh sách thiết bị</Text>}
          {this.state.isDoctor && <Text style={styles.textName}>Danh sách người dùng</Text>}
          <TouchableOpacity style={styles.bellIcon}>
            <Icon name="bell" size={25} color="#FFF"/>
          </TouchableOpacity>
        </ImageBackground>
        <Text style={styles.txDeviceList}>Danh sách:</Text>
        {this.state.isDoctor &&
        <FlatList
          data={this.state.userData}
          renderItem={this.renderItemUser}
        />}
        {(this.state.isDoctor && this.props.user.fetching) &&
        <ActivityIndicator size="large" color="#0000ff"/>}
        {!this.state.isDoctor &&
        <FlatList
          data={this.state.deviceData}
          renderItem={this.renderItem}
        />}
        {(!this.state.isDoctor && this.props.deviceList.fetching) &&
        <ActivityIndicator size="large" color="#0000ff"/>}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    deviceList: state.deviceList,
    user: state.userByDoctor
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchDevice: (data) => {
      dispatch(GetDeviceListTypes.getDeviceListRequest(data))
    },
    onFetchUser: (data) => {
      dispatch(GetUserByDoctorTypes.getUserByDoctorRequest(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseDeviceScreen)
