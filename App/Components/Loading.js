import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, ActivityIndicator, StatusBar } from 'react-native'
import styles from './Styles/LoadingStyle'
export default class Loading extends Component {
  render () {
    return (
      <View style={styles.container}>
        <ActivityIndicator/>
        <StatusBar barStyle="default"/>
      </View>
    )
  }
}
