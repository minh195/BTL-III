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
  View,
  TextInput
} from 'react-native'
import { connect } from 'react-redux'
// Styles
import styles from './Styles/ChooseDeviceScreenStyle'
import GetUserByDoctorTypes from '../Redux/GetUserByDoctorRedux'
import { Images } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import RenderItemChat from '../Components/RenderItemChat'

class UserChatScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      userData: [],
      refreshing: false,
      doctorData: null,
      loading: false,
      text: ''
    }
  }

  handleNavigateToChat = (email, name) => {
    this.props.navigation.navigate(
      'ChatScreen', {
        email: email,
        name: name,
      }
    )
  }
  openDrawer = () => {
    this.props.navigation.openDrawer()
  }

  renderItemUser = ({ item, index }) => {
    return (
      <RenderItemChat item={item}
                      handleNavigateToChat={this.handleNavigateToChat}
      />
    )
  }

  async componentDidMount () {
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
      this.setState({
        loading: true
      })
      const value = await AsyncStorage.getItem('doctorCode')
      fetch(`https://5dcd7cd3d795470014e4d1cd.mockapi.io/doctors?search=${value}`)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            doctorData: responseJson[0],
            loading: false
          })
        })
    }
  }

  saveUser = async (nextProps, response) => {
    this.setState({ userData: response })
  }

  componentWillReceiveProps (nextProps) {
    const response = nextProps.user.payload
    if (response != null) {
      this.saveUser(nextProps, response).then(
        this.setState({ refreshing: false })
      )
    }
  }

  _onRefresh = () => {
    this.setState({ refreshing: true })
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
          <Text style={styles.textName}>Danh sách trò chuyện</Text>
          <TouchableOpacity style={styles.bellIcon}>
            {/*<Icon name="plus" size={25} color="#FFF"/>*/}
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.searchContainer}>
          <View style={{marginRight: 5}}>
            <Icon name="search" size={20} color="#CDD4DA"/>
          </View>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({ text })}
            placeholder="Tìm kiếm cuộc trò chuyện"
            value={this.state.text}
            style={styles.textInput}
          />
        </View>
        <FlatList
          data={this.state.userData}
          renderItem={this.renderItemUser}
        />
        {(!this.state.isDoctor && !this.state.loading) &&
        <RenderItemChat item={this.state.doctorData != null && this.state.doctorData}
                        handleNavigateToChat={this.handleNavigateToChat}
        />}

        {(this.props.user.fetching || this.state.loading) && <ActivityIndicator size="large" color="#0000ff"/>}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userByDoctor
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUser: (data) => {
      dispatch(GetUserByDoctorTypes.getUserByDoctorRequest(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserChatScreen)
