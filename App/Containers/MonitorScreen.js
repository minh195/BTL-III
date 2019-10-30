import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Button
} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
// Styles
import styles from './Styles/MonitorScreenStyle'
import { Images } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'

class MonitorScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      titleBar: 1,
      isChoose1: true,
      isChoose2: false
    }
  }

  openDrawer = () => {
    this.props.navigation.openDrawer()
  }
  renderContent = () => {
    console.log(this.state.titleBar)
    switch (this.state.titleBar) {
      case 1:
        return (
          <View style={styles.content}>
            <Image source={Images.heartBeat} style={styles.heartBeatGif}/>
            <View style={styles.valueContent}>
              <Text style={styles.valueText}>72</Text>
              <Text style={styles.unitText}>beats per minute</Text>
            </View>
            <Image source={Images.heartBeatWave} style={styles.heartBeatWaveGif}/>
          </View>
        )
      case 2:
        const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
        const axesSvg = { fontSize: 10, fill: 'grey' }
        const verticalContentInset = { top: 10, bottom: 10 }
        const xAxisHeight = 30
        return (
          <View style={{ height: 200, padding: 20, flexDirection: 'row' }}>
            <YAxis
              data={data}
              style={{ marginBottom: xAxisHeight }}
              contentInset={verticalContentInset}
              svg={axesSvg}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <LineChart
                style={{ flex: 1 }}
                data={data}
                contentInset={verticalContentInset}
                svg={{ stroke: 'rgb(134, 65, 244)' }}
              >
                <Grid/>
              </LineChart>
              <XAxis
                style={{ marginHorizontal: -10, height: xAxisHeight }}
                data={data}
                formatLabel={(value, index) => index}
                contentInset={{ left: 10, right: 10 }}
                svg={axesSvg}
              />
            </View>
          </View>
        )
      default:
        return null
    }
  }
  handleNavigate2 = () => {
    if (this.state.titleBar === 2) return null
    else {
      this.setState((state) => {
        return {
          titleBar: 2,
          isChoose1: !this.state.isChoose1,
          isChoose2: !this.state.isChoose2
        }
      })
    }
  }
  handleNavigate1 = () => {
    if (this.state.titleBar === 1) return null
    else {
      this.setState((state) => {
        return {
          titleBar: 1,
          isChoose1: !this.state.isChoose1,
          isChoose2: !this.state.isChoose2
        }
      })
    }
  }

  render () {
    console.log(this.state.titleBar)
    return (
      <View style={styles.container}>
        <ImageBackground source={Images.backgroundHeaderBar}
                         style={styles.backgroundHeaderBar}>
          <TouchableOpacity
            onPress={this.openDrawer}
            style={styles.menuIcon}
          >
            <Icon name="bars" size={30} color="#FFF"/>
          </TouchableOpacity>
          <Text style={styles.textName}>Heart Rate</Text>
          <TouchableOpacity style={styles.bellIcon}>
            <Icon name="bell" size={25} color="#FFF"/>
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.tabHotContainer}>
          <TouchableOpacity
            onPress={this.handleNavigate1}
            style={styles.navigateButton}
          >
            <Text style={styles.navigateText}>Measure</Text>
            {this.state.isChoose1 && <View style={styles.chooseView}/>}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handleNavigate2}
            style={styles.navigateButton}
          >
            <Text style={styles.navigateText}>Statistics</Text>
            {this.state.isChoose2 && <View style={styles.chooseView}/>}
          </TouchableOpacity>
        </View>
        <View>
        </View>
        {this.renderContent()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MonitorScreen)
