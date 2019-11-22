import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native'
import styles from './Styles/MonitorStyle'
import { Images } from '../Themes'

export default class Monitor extends Component {

  render () {
    return (
      <View style={styles.content}>
        <Image source={Images.heartBeat} style={styles.heartBeatGif}/>
        <View style={styles.valueContent}>
          <Text style={styles.valueText}>{this.props.param}</Text>
          <Text style={styles.unitText}>beats per minute</Text>
        </View>
        <Image source={Images.heartBeatWave} style={styles.heartBeatWaveGif}/>
      </View>
    )
  }
}
