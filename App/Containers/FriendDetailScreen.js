import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Image, AsyncStorage, ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
// Styles
import styles from './Styles/FriendDetailScreenStyle'
import { NavigationActions } from 'react-navigation'
import GetUserByIdTypes from '../Redux/GetUserByIdRedux'
import GetUserByDoctorTypes from '../Redux/GetUserByDoctorRedux'

class FriendDetailScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataProfile: [],
      currentYear: 2020,
      isDoctor: false
    }
  }

  async componentDidMount () {
    try {
      const type = await AsyncStorage.getItem('typeUser')
      if (type === 'doctor') {
        this.setState({
          isDoctor: true
        })
      }
      if (this.state.isDoctor) {
        let value = await AsyncStorage.getItem('doctorCode')
        this.props.onFetchDetail(value)
      } else {
        console.log('user fetch')
        let value = await AsyncStorage.getItem('userCode')
        this.props.onFetchUserDetail(value)
      }
    } catch (e) {
      // error reading value
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.isDoctor) {
      let response = nextProps.doctor.payload
      if (response != null) {
        this.setState({
          dataProfile: response[0]
        })
      }
    } else {
      let response = nextProps.user.payload
      if (response != null) {
        this.setState({
          dataProfile: response[0]
        })
      }
    }
  }

  _renderItem = () => {
    return (
      <View
        style={styles.imageFlatList}>
        <Image
          source={{ uri: this.state.dataProfile.avatar }}
          style={styles.imageRecent}/>
      </View>
    )
  }
  _handleGoBack = () => this.props.navigation.dispatch(NavigationActions.back())

  render () {
    const { dataProfile, currentYear, isDoctor } = this.state
    return (
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: dataProfile.avatar }}
          style={styles.friendAvatar}>
          <TouchableOpacity onPress={this._handleGoBack}>
            <View style={styles.backIcon}>
              <Icon name="arrow-circle-left" size={25} color="#82C91E"/>
            </View>
          </TouchableOpacity>
        </ImageBackground>
        <View>
          <View style={styles.infoContainer}>
            <View style={styles.infoHeader}>
              {(this.props.user.fetching || this.props.doctor.fetching) &&
              <ActivityIndicator size="large" color="blue"/>}
              {dataProfile.length !== 0 && <View style={{alignItems: 'center'}}>
                <Text style={styles.fullNameText}>{dataProfile.name}</Text>
                <Text style={styles.companyText}>{dataProfile.email}</Text>
              </View>}
            </View>
            <View style={styles.counterContainer}>
              <View style={styles.widthDivThree}>
                <Text style={styles.textInfo}>{isDoctor ? 'Người dùng' : 'Thiết bị'}</Text>
                <Text style={styles.textNumber}>2</Text>
              </View>
              <View style={styles.widthDivThree}>
                <Text style={styles.textInfo}>Tuổi</Text>
                <Text style={styles.textNumber}>{currentYear - parseInt(dataProfile.age)}</Text>
              </View>
              <View style={styles.widthDivThree}>
                <Text style={styles.textInfo}>SĐT</Text>
                <Text style={styles.textNumber}>{dataProfile.tel}</Text>
              </View>
            </View>
          </View>
          <View style={styles.followButton}>
            <TouchableOpacity style={styles.followTouch}>
              <Text style={styles.followText}>Sửa thông tin</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footerContainer}>
          <Text style={{ marginLeft: 15 }}>Ảnh gần đây:</Text>
          <View style={styles.flatListContainer}>
            <FlatList
              data={[
                { key: 1 },
                { key: 2 },
                { key: 3 },
                { key: 4 }
              ]}
              renderItem={this._renderItem}
              horizontal={true}/>
          </View>
          <View/>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    doctor: state.userByID,
    user: state.userByDoctor
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchDetail: (data) => {
      dispatch(GetUserByIdTypes.getUserByIdRequest(data))
    },
    onFetchUserDetail: (data) => {
      dispatch(GetUserByDoctorTypes.getUserByDoctorRequest(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendDetailScreen)
