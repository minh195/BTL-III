import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/RoomChatScreenStyle'

class RoomChatScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  onPress = () =>
    this.props.navigation.navigate('ChatScreen', { name: this.state.name })

  onChangeText = name => this.setState({ name })

  render () {
    return (
      <View>
        <Text style={styles.title}>Enter your name:</Text>
        <TextInput
          style={styles.nameInput}
          placeHolder='Flutter God Evan Bacon'
          onChangeText={this.onChangeText}
          value={this.state.name}
        />
        <TouchableOpacity onPress={this.onPress}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomChatScreen)
