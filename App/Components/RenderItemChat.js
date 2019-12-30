import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import styles from './Styles/RenderItemChatStyle'
const width = Dimensions.get('window').width
export default class RenderItemChat extends Component {

  constructor (props) {
    super(props)
  }

  handleNavigate = () => {
    this.props.handleNavigateToChat(this.props.item.email, this.props.item.name)
  }

  render () {
    let { item } = this.props
    const today = new Date();
    const time = today.getHours() + ":" + today.getSeconds();
    return (
      <View>
        <TouchableOpacity
          style={[styles.container, styles.flexRow]}
          onPress={this.handleNavigate}
        >
          <Image source={{ uri: item.avatar }} style={styles.imageStyle}/>
          <View style={styles.textContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between' }}>
              <Text style={styles.textName}>{item.name}</Text>
              <Text>{time}</Text>
            </View>
            <View style={{width:width-100,flexDirection:'row', justifyContent:'space-between'}}>
              <View style={{width:width-130}}><Text style={styles.textEmail} numberOfLines={1}>{item.email}</Text></View>
              <Text>✓</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
