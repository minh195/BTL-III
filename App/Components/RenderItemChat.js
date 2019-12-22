import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './Styles/RenderListUserStyle'

export default class RenderItemChat extends Component {

  constructor (props) {
    super(props)
  }

  handleNavigate = () => {
    this.props.handleNavigateToChat(this.props.item.email, this.props.item.name)
  }

  render () {
    let { item } = this.props
    return (
      <View>
        <TouchableOpacity
          style={[styles.container, styles.flexRow]}
          onPress={this.handleNavigate}
        >
          <Image source={{ uri: item.avatar }} style={styles.imageStyle}/>
          <View style={styles.textContainer}>
            <Text style={styles.textName}>{item.name}</Text>
            <Text style={styles.textEmail}>{item.email}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
