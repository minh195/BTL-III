import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage,
  ActivityIndicator
} from 'react-native'
import styles from './Styles/ChatScreenStyle'
import { Images } from '../Themes'
import PopUpMoDal from '../Components/PopUpMoDal'
import { connect } from 'react-redux'
import Fire from '../Components/Fire'
import { GiftedChat } from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/FontAwesome'
import Loading from '../Components/Loading'

class ChatScreen extends Component {
  openDrawer = () => {
    this.props.navigation.openDrawer()
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

  componentDidMount () {
    Fire.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
        loading: false
      }))
    )
    this.getData().then()
  }

  componentWillUnmount () {
    Fire.shared.off()
  }

  render () {
    console.log('message from database: ', this.state.messages)
    console.disableYellowBox = true
    return (
      <View style={styles.container}>
        <PopUpMoDal ref={'addModal'}/>
        <View style={styles.header}>
          <ImageBackground source={Images.backgroundHeaderBar}
                           style={styles.backgroundHeaderBar}>
            <View style={styles.elementHeader}>
              <TouchableOpacity onPress={this.openDrawer} style={styles.goBackIcon}>
                <Icon name="bars" size={30} color="#FFF"/>
              </TouchableOpacity>
              <View style={{ alignSelf: 'center' }}>
                <Text style={styles.textName}>Doctor</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.content}>
          {this.state.loading && <Loading/>}
          <GiftedChat
            messages={this.state.messages}
            onSend={Fire.shared.send}
            user={this.user}
            onPressAvatar={() => alert('short press')}
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
