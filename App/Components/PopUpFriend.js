import React, { Component } from 'react'
import styles from './Styles/PopUpFriendStyle'
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  Modal
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
    return (
      <Modal ref={'myModal'}
        transparent
        visible={this.state.modalVisible}
        animated>
        <View style={styles.popUpTransparent}>
          <View style={styles.containerPopUp}>
            <View style={styles.headerContainer}>
              <Image source={{ uri: friendData.image }}
                style={styles.popUpImage} />
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonNext}
                  onPress={this._showFriend}>
                  <Text style={styles.textNext}>Chi tiết</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.hideModal}>
                  <Text style={styles.textSkip}>Bỏ qua</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}
