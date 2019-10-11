import React, { Component } from 'react'
import styles from './Styles/PopUpFriendStyle'
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native'

export default class PopUpFriend extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalVisible: false,
      friendData: []
    }
  }

  setModalVisible (visible) {
    this.setState({ modalVisible: visible })
  }

  showModal = (maker) => {
    const { friendData } = this.state
    this.setState((state) => {
      return { friendData: maker }
    })
    this.setModalVisible(true)
  }
  hideModal = () => {
    this.setModalVisible(!this.state.modalVisible)
  }
  _showFriend = () => {
    const { friendData } = this.state
    this.props.showFriend(friendData)
  }

  render () {
    const { friendData } = this.state
    console.log('maker in modal: ', this.state.friendData)
    return (
      <Modal ref={'myModal'}
             transparent={true}
             visible={this.state.modalVisible}
             animated={true}>
        <View style={styles.popUpTransparent}>
          <View style={styles.containerPopUp}>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <View style={{
                justifyContent: 'center',
                marginLeft: 25
              }}>
                <Image source={
                  { uri: this.state.friendData.url_avatar }
                }
                       style={styles.popUpImage}/>
              </View>
              <View style={{
                marginLeft: 10
              }}>
                <Text style={styles.textWelcome}>

                  {this.state.friendData.fullname}
                </Text>
                <Text style={{
                  fontSize: 12
                }}>
                  {this.state.friendData.birth_day}
                </Text>
              </View>
              <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <TouchableOpacity style={styles.buttonNext}
                                  onPress={this._showFriend}>
                  <Text style={styles.textNext}>Follow</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.hideModal}>
                  <Text style={styles.textSkip}>SKIP</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',

            }}>
              <Image source={
                { uri: this.state.friendData.url_bks }}
                     style={{
                       height: 80,
                       width: 180,
                       borderRadius: 15
                     }}/>
              <Text style={{
                color: 'gray',
              }}> 1/8</Text>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}
