import React, { Component } from 'react'
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import Monitor from '../Components/Monitor'
import HistoryScreen from './HistoryScreen'
import styles from './Styles/MonitorScreenStyle'

class MonitorScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      titleBar: 1,
      isChoose1: true,
      isChoose2: false,
      itemChoose: null
    }
  }

  goBack = () => {
    this.props.navigation.goBack()
  }
  renderContent = () => {
    switch (this.state.titleBar) {
      case 1:
        return (
          <Monitor param={this.props.navigation.getParam('paraRecent', 'No Data')}
            dateTimeParam={this.props.navigation.getParam('dateTime', 'No Data')}
          />
        )
      case 2:
        return (
          <HistoryScreen idDevice={this.props.navigation.getParam('idDevice', 'NO-ID')} />
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
  _onRefresh = () => {

  }

  onNavigate = () => {
    this.props.navigation.navigate('ScanDeviceScreen')
  }

  render () {
    return (
      <View style={styles.container}>
        <ImageBackground source={Images.backgroundHeaderBar}
          style={styles.backgroundHeaderBar}>
          <TouchableOpacity
            style={styles.menuIcon}
            onPress={this.goBack}
          >
            <Icon name='arrow-left' size={30} color='#FFF' />
          </TouchableOpacity>
          <Text style={styles.textName}>Nhịp tim</Text>
          <TouchableOpacity style={styles.bellIcon}
            onPress={this.onNavigate}
          >
            <Icon name='search' size={25} color='#FFF' />
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.tabHotContainer}>
          <TouchableOpacity
            onPress={this.handleNavigate1}
            style={styles.navigateButton}
          >
            <Text style={styles.navigateText}>Thông số</Text>
            {this.state.isChoose1 && <View style={styles.chooseView} />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handleNavigate2}
            style={styles.navigateButton}
          >
            <Text style={styles.navigateText}>Lịch sử</Text>
            {this.state.isChoose2 && <View style={styles.chooseView} />}
          </TouchableOpacity>
        </View>
        <View />
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
