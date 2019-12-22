import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage, ActivityIndicator,
} from 'react-native'
import styles from './Styles/ChatScreenStyle'
import { Images } from '../Themes'
import PopUpMoDal from '../Components/PopUpMoDal'
import { connect } from 'react-redux'
import Fire from '../Components/Fire'
import { GiftedChat } from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/FontAwesome'

class ChatScreen extends Component {
  goBack = () => {
    this.props.navigation.goBack()
  }
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  })

  state = {
    messages: [],
    email: '',
    loading: true
  }

  get user () {
    return {
      // name: this.props.navigation.state.params.name,
      name: this.state.email,
      _id: Fire.shared.uid
    }
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('email')
      if (value !== null) {
        this.setState({
          email: value
        })
      }
    } catch (e) {
      // error reading value
    }
  }
  configChat = (mes) => {
    console.log('message from database: ', mes)
  }

  componentDidMount () {
    console.log("item name: ", this.props.navigation.getParam("name",'No Data'))
    console.log("item email: ", this.props.navigation.getParam("email",'No Data'))
    Fire.shared.on(message => {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
        loading: false
      }))
      this.configChat(message)
    })
    this.getData().then()

  }

  componentWillUnmount () {
    Fire.shared.off()
  }

  onPressAvatar = () => {
    this.props.navigation.navigate('FriendDetailScreen')
  }

  render () {
    console.disableYellowBox = true
    return (
      <View style={styles.container}>
        <PopUpMoDal ref={'addModal'}/>
          <ImageBackground source={Images.backgroundHeaderBar}
                           style={styles.backgroundHeaderBar}>
            <View style={styles.elementHeader}>
              <TouchableOpacity onPress={this.goBack} style={styles.goBackIcon}>
                <Icon name="arrow-left" size={30} color="#FFF"/>
              </TouchableOpacity>
              <View style={{ alignSelf: 'center' }}>
                <Text style={styles.textName}>{this.props.navigation.getParam("name",'No Data')}</Text>
              </View>
            </View>
          </ImageBackground>
        <View style={styles.content}>
          {this.state.loading && <View style={{marginTop: 10}}>
            <ActivityIndicator size="large" color="#0000ff"/>
            </View>}
          <GiftedChat
            messages={this.state.messages}
            onSend={Fire.shared.send}
            user={this.user}
            onPressAvatar={this.onPressAvatar}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const Chat = connect(mapStateToProps, mapDispatchToProps)(ChatScreen)
export default Chat
