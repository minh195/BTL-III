import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Image,
  AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

// import components
import PopUpFriend from '../Components/PopUpFriend'
import Loading from '../Components/Loading'

// Styles
import styles from './Styles/MapScreenStyle'
import Icon from 'react-native-vector-icons/FontAwesome'
import GetFriendLocationTypes from '../Redux/GetFriendLocationRedux'
import GetDeviceListTypes from '../Redux/GetDeviceListRedux'

class MapScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      makerData: {},
      isLoading: true,
      initialRegion: {
        latitude: null,
        longitude: null,
        latitudeDelta: null,
        longitudeDelta: null
      },
      isDoctor: false,
      deviceData: []
    }
  }

  async componentDidMount () {
    const type = await AsyncStorage.getItem('typeUser')

    if (type === 'doctor') {
      this.setState({
        isDoctor: true
      })
      this.props.onFetchFriend()
    } else {
      try {
        const value = await AsyncStorage.getItem('userCode')
        if (value !== null) {
          this.props.onFetchDevice(value)
        }
      } catch (e) {
        // error reading value
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.isDoctor) {
      const response = nextProps.friends.payload
      if (response != null) {
        this.setState({
          isLoading: false,
          data: response,
          initialRegion: {
            latitude: response[0] != null && parseFloat(response[2].lat),
            longitude: response[0] != null && parseFloat(response[2].lng),
            latitudeDelta: 0.09221,
            longitudeDelta: 0.04211
          }
        })
      }
    } else {
      const response = nextProps.deviceList.payload

      if (response != null) {
        console.log('response null: ', response.length)
        if (response.length === 0) {
          this.setState({
            isLoading: false
          })
          global.currentScreenIndex = 0
          alert('Không có thiết bị nào, liên hệ chúng tôi để được cung cấp thiết bị!')
          // this.props.navigation.navigate('Drawer')
        } else {
          this.setState({
            deviceData: response,
            isLoading: false,
            initialRegion: {
              latitude: response[0] != null && parseFloat(response[0].lat),
              longitude: response[0] != null && parseFloat(response[0].lng),
              latitudeDelta: 0.09221,
              longitudeDelta: 0.04211
            }
          })
        }
      }
    }
  }

  showFriends = (data) => {
    return data.map(marker => (
      <Marker
        key={marker.id}
        draggable
        coordinate={{
          latitude: parseFloat(marker.lat),
          longitude: parseFloat(marker.lng)
        }}
        title={marker.name}
        onPress={() => { this.refs.addModal.showModal(marker) }
        }>
        <View style={styles.maker}>
          <Image source={{ uri: marker.image }}
            style={styles.markerAvatar} />
        </View>
      </Marker>
    ))
  }
  _showDetailFriend = async (friendData) => {
    await this.refs.addModal.hideModal()
    this.props.navigation.navigate(
      'MonitorScreen', {
        idDevice: friendData.id,
        paraRecent: friendData.parameter,
        dateTime: friendData.date_time
      }
    )
  }

  _signOutAsync = () => {
    global.currentScreenIndex = 0
    this.props.navigation.goBack()
  }

  render () {
    const { data, isLoading, deviceData, isDoctor } = this.state
    if (isLoading) {
      return (
        <Loading />
      )
    }
    return (
      <View>
        <PopUpFriend ref={'addModal'} showFriend={this._showDetailFriend} />
        {(this.state.initialRegion.latitude != null && this.state.initialRegion.longitude != null && this.state.initialRegion.latitudeDelta != null && this.state.initialRegion.longitudeDelta != null) &&
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.mapContainer}
          initialRegion={this.state.initialRegion}>
          {isDoctor ? this.showFriends(data) : this.showFriends(deviceData)}
        </MapView>}
        <View style={styles.signOutButton}>
          <TouchableOpacity onPress={this._signOutAsync}>
            <Icon name='arrow-left' size={25} color='#82C91E' />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    friends: state.getFriend,
    deviceList: state.deviceList
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchFriend: () => {
      dispatch(GetFriendLocationTypes.getFriendLocationRequest())
    },
    onFetchDevice: (data) => {
      dispatch(GetDeviceListTypes.getDeviceListRequest(data))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)
