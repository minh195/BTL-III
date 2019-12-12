import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

//import components
import PopUpFriend from '../Components/PopUpFriend'
import Loading from '../Components/Loading'

// Styles
import styles from './Styles/MapScreenStyle'
import Icon from 'react-native-vector-icons/FontAwesome'
import GetFriendLocationTypes from '../Redux/GetFriendLocationRedux'

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
    console.log('response: ', response)
    if (response != null) {
      return {
        isLoading: false,
        data: response
      }
    } else return null
  }

  showFriends = (data) => {
    return data.map(marker => (
      <Marker
        key={marker.id}
        draggable
        coordinate={{
          latitude: parseFloat(marker.lat),
          longitude: parseFloat(marker.lng),
        }}
        title={marker.name}
        onPress={() => {this.refs.addModal.showModal(marker)}
        }>
        <View style={styles.maker}>
          <Image source={{ uri: marker.image }}
                 style={styles.markerAvatar}/>
          <Text style={styles.markerName}>{marker.name}</Text>
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
  _signOutAsync = () => {
    this.props.navigation.goBack()
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
            <Icon name="arrow-left" size={25} color="#82C91E"/>
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
      dispatch(GetFriendLocationTypes.getFriendLocationRequest())
    },
    // onFetchClear: () => {
    //   dispatch(GetFriendLocationTypes.getFriendLocationClear())
    // }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)
