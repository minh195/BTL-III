import React, { Component } from 'react'
import { View, Image } from 'react-native'
import styles from './Styles/NoDataStyle'
import images from '../Themes/Images'
export default class NoData extends Component {
  render () {
    return (
      <View>
        <Image style={styles.image}
               source={images.noData}/>
      </View>
    )
  }
}
