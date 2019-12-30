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
    loading: true,
    avatar: ''
  }

  get user () {
    return {
      // name: this.props.navigation.state.params.name,
      email: this.state.email,
      _id: Fire.shared.uid,
      avatar: this.state.avatar,
      sendTo: this.props.navigation.getParam('email')
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

  async componentDidMount () {
    const avatar = await AsyncStorage.getItem('avatar')
    this.setState({
      avatar: avatar
    })
    this.setState()
    Fire.shared.on(message => {
      if ((message.user.email === this.state.email && message.user.sendTo === this.props.navigation.getParam('email')) || (message.user.email === this.props.navigation.getParam('email') && (message.user.sendTo === this.state.email))) {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, message),
          loading: false
        }))
      } else {
        this.setState({
          loading: false
        })
      }
    })
    this.getData().then()

  }

  componentWillUnmount () {
    Fire.shared.off()
  }

  onPressAvatar = () => {
    this.props.navigation.navigate('FriendDetailScreen')
  }
  // renderSend(props) {
  //   return (
  //     <Send
  //       {...props}
  //     >
  //       <View>
  //         <Image source={images.sendIcon} style={styles.send_icon}/>
  //       </View>
  //     </Send>
  //   );
  // }
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
              <Text style={styles.textName}>{this.props.navigation.getParam('name', 'Bác sĩ')}</Text>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.content}>
          {this.state.loading && <View style={{ marginTop: 10 }}>
            <ActivityIndicator size="large" color="#0000ff"/>
          </View>}
          <GiftedChat
            messages={this.state.messages}
            onSend={Fire.shared.send}
            user={this.user}
            onPressAvatar={this.onPressAvatar}
            placeholder={'Nhập tin nhắn...'}
            renderAvatarOnTop={true}
            // renderInputToolbar={this.renderInputToolbar}
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
