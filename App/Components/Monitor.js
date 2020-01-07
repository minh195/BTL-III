import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native'
import styles from './Styles/MonitorStyle'
import { Images } from '../Themes'
import moment from 'moment'

export default class Monitor extends Component {
  render () {
    return (
      <View style={styles.content}>
        <Image source={Images.heartBeat} style={styles.heartBeatGif} />
        <View style={styles.valueContent}>
          <Text style={styles.valueText}>{this.props.param}</Text>
          <Text style={styles.unitText}>nhịp/phút</Text>
          <Text style={styles.unitText}>
            ({moment(this.props.dateTimeParam).format('LT')} {moment(this.props.dateTimeParam).format('l')})
          </Text>
        </View>
        <Image source={Images.heartBeatWave} style={styles.heartBeatWaveGif} />
      </View>
    )
  }
}
