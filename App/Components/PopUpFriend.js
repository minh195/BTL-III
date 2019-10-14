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
            <View style={styles.headerContainer}>
              <Image source={{ uri: this.state.friendData.url_avatar }}
                     style={styles.popUpImage}/>
              <View style={styles.textContainer}>
                <Text style={styles.textWelcome}>
                  {this.state.friendData.fullname}
                </Text>
                <Text style={styles.birthDayText}>
                  {this.state.friendData.birth_day}
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonNext}
                                  onPress={this._showFriend}>
                  <Text style={styles.textNext}>Follow</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.hideModal}>
                  <Text style={styles.textSkip}>SKIP</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.footerContainer}>
              <Image source={{ uri: this.state.friendData.url_bks }}
                     style={styles.imageShot}/>
              <Text style={styles.counterText}> 1/8</Text>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}
