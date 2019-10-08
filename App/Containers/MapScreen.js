import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
// Styles
import styles from './Styles/MapScreenStyle'
import AsyncStorage from '@react-native-community/async-storage'
import GetFriendLocationTypes from '../Redux/GetFriendLocationRedux'

const heights = Dimensions.get('window').height
const widths = Dimensions.get('window').width

class MapScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear()
    this.props.navigation.navigate('AuthLoading')
  }

  componentDidMount () {
    this.props.onFetchFriend()
  }

  componentWillReceiveProps (nextProps) {
    const response = nextProps.friends.payload
    if (response != null) {
      console.log(response.status_code)
      if (response.status_code === 200) {
        this.setState((state) => {
          return {data: response.data};
        });
      }
    }
  }

  showFriends = (data) => {
    console.log('value of makers',data)
    return data.map(marker => (
      <Marker
        draggable
        coordinate={{
          latitude: marker.lat,
          longitude: marker.lng,
        }}
        title={'Test'}
        description={'This is a description of the marker'}
      />
    ))
  }
  render () {
    const { data } = this.state
    return (
      <View>
        <View style={{
          backgroundColor: 'transparent',
        }}>
          <TouchableOpacity onPress={this._signOutAsync}>
            <Text style={{ color: 'black' }}>Log out</Text>
          </TouchableOpacity>
        </View>

        <View style={{
          height: heights,
          width: widths,
        }}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={{
              height: heights,
              width: widths,
            }}
          >
            {this.showFriends(data)}
          </MapView>
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
      console.log('fetchFriend')
      dispatch(GetFriendLocationTypes.getFriendLocationRequest())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)
