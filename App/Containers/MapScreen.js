import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native'
import { connect } from 'react-redux'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import AsyncStorage from '@react-native-community/async-storage'

//import components
import GetFriendLocationTypes from '../Redux/GetFriendLocationRedux'
import PopUpFriend from '../Components/PopUpFriend'
import Loading from '../Components/Loading'

// Styles
import styles from './Styles/MapScreenStyle'
import Icon from 'react-native-vector-icons/FontAwesome'

class MapScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      makerData: {},
      isLoading: true,
      initialRegion: {
        latitude: 21.0339828,
        longitude: 105.7653803,
        latitudeDelta: 0.09221,
        longitudeDelta: 0.04211,
      }
    }
  }

  componentDidMount () {
    this.props.onFetchFriend()
  }

  static getDerivedStateFromProps (nextProps) {
    const response = nextProps.friends.payload
    if (response != null) {
      console.log('status_code = ', response.status_code)
      if (response.status_code === 200) {
        return {
          isLoading: false,
          data: response.data
        }
      }
    }
    return null
  }

  showFriends = (data) => {
    console.log('value of makers', data)
    const reduceData = data.filter(arr => arr.id < 100)
    console.log('reduceData', reduceData)
    return reduceData.map(marker => (
      <Marker
        key={marker.id}
        draggable
        coordinate={{
          latitude: marker.lat,
          longitude: marker.lng,
        }}
        title={marker.fullname}
        onPress={() => {this.refs.addModal.showModal(marker)}
        }>
        <View style={styles.maker}>
          <Image source={{ uri: marker.url_avatar }}
                 style={styles.markerAvatar}/>
          <Text style={styles.markerName}>{marker.fullname}</Text>
        </View>
      </Marker>
    ))
  }
  _showDetailFriend = async (friendData) => {
    await this.refs.addModal.hideModal()
    await this.props.navigation.navigate(
      'FriendDetailScreen',
      { friendDetail: friendData }
    )
  }
  _signOutAsync = async () => {
    await this.props.onFetchClear()
    await AsyncStorage.clear()
    await this.props.navigation.navigate('SignInScreen')
  }

  render () {
    const { data, isLoading } = this.state
    if (isLoading) {
      return (
        <Loading/>
      )
    }
    return (
      <View>
        <PopUpFriend ref={'addModal'} showFriend={this._showDetailFriend}/>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.mapContainer}
          initialRegion={this.state.initialRegion}>
          {this.showFriends(data)}
        </MapView>
        <View style={styles.signOutButton}>
          <TouchableOpacity onPress={this._signOutAsync}>
            <Icon name="sign-out" size={25} color="#82C91E"/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    friends: state.getFriend
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchFriend: () => {
      console.log('Fetch friend')
      dispatch(GetFriendLocationTypes.getFriendLocationRequest())
    },
    onFetchClear: () => {
      console.log('Clear redux')
      dispatch(GetFriendLocationTypes.getFriendLocationClear())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)
