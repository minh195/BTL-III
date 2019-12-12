import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage
} from 'react-native'
import styles from './Styles/ChatScreenStyle'
import { Images } from '../Themes'
import PopUpMoDal from '../Components/PopUpMoDal'
import Loading from '../Components/Loading'
import { connect } from 'react-redux'
import Fire from '../Components/Fire'
import { GiftedChat } from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/FontAwesome'

class ChatScreen extends Component {
  openDrawer = () => {
    this.props.navigation.openDrawer()
  }
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     items: [{
  //       type: 1,
  //       key: '1',
  //       id: 1,
  //       label: `I'm ok thanks for asking and you? It's been a long time since we've seen each other.`,
  //       receiveMes: ''
  //     }],
  //     text: '',
  //     loading: true,
  //     error: false,
  //     posts: '',
  //     value: ''
  //   }
  // }
  //
  // componentWillReceiveProps (nextProps) {
  //   let { items } = this.state
  //   let posts = nextProps.messages.payload
  //   if (posts != null) {
  //     console.log(posts)
  //     let item = {
  //       type: 2,
  //       id: items[items.length - 1].id++, // get the last id of our items and increment it(i.e +1)
  //       receiveMes: posts//remove line space
  //     }
  //     items.push(item) // add our new item
  //     let _lengthItems = this.state.items.length
  //     this.state.items.splice(_lengthItems - 2, 1)
  //   }
  // }
  //
  // _onChangeText = (text) => this.setState({ text, item: text })
  // submitAndClear = () => {
  //   this.setState({
  //     text: ''
  //   })
  // }
  // addItem = (value) => {
  //   if (this.state.text === '') {
  //     alert('Type a message!!')
  //   } else {
  //     let { items } = this.state
  //     let item = {
  //       id: items[items.length - 1].id++,
  //       type: 1,
  //       label: value
  //     }
  //     items.push(item)
  //     Keyboard.dismiss()
  //     this.submitAndClear()
  //     this.HandleReceiveMessage(value)
  //   }
  // }
  // HandleReceiveMessage = (value) => {
  //   const { items } = this.state
  //   let item = {
  //     type: 3,
  //     id: items[items.length - 1].id++,
  //   }
  //   items.push(item)
  //   try {
  //     this.props.onFetchMessage(value)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
  // renderItem = ({ item }) => {
  //   let { label, receiveMes, type } = item
  //   const { error } = this.state
  //   if (error) {
  //     return (
  //       <View style={styles.center}>
  //         <Text>Failed to load message!</Text>
  //       </View>
  //     )
  //   }
  //   if (type === 1) {
  //     return (
  //       <View style={styles.item}>
  //         <View>
  //           <Text style={styles.textMessage}>
  //             {label}
  //             <Text style={styles.timeMessage}>
  //               {'\n'}12:23 PM
  //             </Text>
  //             <Text> ✓</Text>
  //           </Text>
  //         </View>
  //         <Image style={styles.avatarUser}
  //                source={Images.myAvatar}/>
  //       </View>
  //     )
  //   }
  //   if (type === 3) {
  //     return (
  //       <Loading/>
  //     )
  //   } else {
  //     return (
  //       <View style={styles.item1}>
  //         <Image style={styles.avatarUser1}
  //                source={Images.avatarUser}/>
  //         <Text style={styles.textMessage1}>
  //           {receiveMes}
  //           <Text style={styles.timeMessage1}>{'\n'}01:22 PM</Text>
  //         </Text>
  //       </View>
  //     )
  //   }
  // }
  //
  // componentDidMount () {
  //   this.keyboardDidShowListener = Keyboard.addListener(
  //     'keyboardDidShow',
  //   )
  //   this.keyboardDidHideListener = Keyboard.addListener(
  //     'keyboardDidHide',
  //   )
  // }
  //
  // componentWillUnmount () {
  //   this.keyboardDidShowListener.remove()
  //   this.keyboardDidHideListener.remove()
  // }
  //
  // _signOutAsync = async () => {
  //   await AsyncStorage.clear()
  //   this.props.navigation.navigate('SignInScreen')
  // }
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  })

  state = {
    messages: [],
    email:''
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
      if(value !== null) {
        this.setState({
          email:value
        })
      }
    } catch(e) {
      // error reading value
    }
  }
  componentDidMount() {
    Fire.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
    this.getData().then()
  }
  componentWillUnmount() {
    Fire.shared.off();
  }
  render () {
    console.log("message from database: ", this.state.messages)
      console.disableYellowBox = true
      return (
        <View style={styles.container}>
          <PopUpMoDal ref={'addModal'}/>
          <View style={styles.header}>
            <ImageBackground source={Images.backgroundHeaderBar}
                             style={styles.backgroundHeaderBar}>
              <View style={styles.elementHeader}>
                <TouchableOpacity onPress={this.openDrawer}  style={styles.goBackIcon}>
                  <Icon name="bars" size={30} color="#FFF"/>
                </TouchableOpacity>
                <View>
                  <Text style={styles.textName}>Doctor</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.content}>
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

const mapStateToProps = (state) => {return{}}

const mapDispatchToProps = (dispatch) => {return{}}

const Chat = connect(mapStateToProps, mapDispatchToProps)(ChatScreen)
export default Chat
