import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native'
import styles from './Styles/MonitorStyle'
import { Images } from '../Themes'

export default class Monitor extends Component {

  render () {
    console.log("item passed: ", this.props.dateTimeParam)
    return (
      <View style={styles.content}>
        <Image source={Images.heartBeat} style={styles.heartBeatGif}/>
        <View style={styles.valueContent}>
          <Text style={styles.valueText}>{this.props.param}</Text>
          <Text style={styles.unitText}>nhịp/phút</Text>
          <Text style={styles.unitText}>
            ({Date(this.props.dateTimeParam).toString().split(" ")[4]} {Date(this.props.dateTimeParam).toString().split(" ")[0]} {Date(this.props.dateTimeParam).toString().split(" ")[1]} {Date(this.props.dateTimeParam).toString().split(" ")[2]} {Date(this.props.dateTimeParam).toString().split(" ")[3]})
          </Text>
        </View>
        <Image source={Images.heartBeatWave} style={styles.heartBeatWaveGif}/>
      </View>
    )
  }
}
