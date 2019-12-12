import React, { Component } from 'react'
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import GetHistoryTypes from '../Redux/GetHistoryRedux'
// Styles

import styles from './Styles/MonitorScreenStyle'
import { Images } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import Monitor from '../Components/Monitor'
import HistoryScreen from './HistoryScreen'
class MonitorScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      titleBar: 1,
      isChoose1: true,
      isChoose2: false,
      itemChoose: null,
      historyData: []
    }
  }
  componentDidMount (){
    this.props.onFetchHistory()
  }
  saveHistory = async (nextProps, response) => {
    await response.map((item, index) => {
      if (item.device_id.toString() === this.props.navigation.getParam('idDevice', 'NO-ID')) {
        this.state.historyData.push(item)
      }
    })
  }
  componentWillReceiveProps (nextProps) {
    const response = nextProps.history.payload
    if (response != null) {
      this.saveHistory(nextProps, response).then()
    }
  }
  goBack =()=>{
    this.props.navigation.navigate({ routeName: "Drawer" })
  }
  renderContent = () => {
    switch (this.state.titleBar) {
      case 1:
        return (
          <Monitor param={this.props.navigation.getParam("paraRecent",'No Data')}/>
        )
      case 2:
        return (
          <HistoryScreen historyData={this.state.historyData}/>
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
  render () {
    console.log("item response:", this.state.historyData)
    return (
      <ScrollView style={styles.container}>
        <ImageBackground source={Images.backgroundHeaderBar}
                         style={styles.backgroundHeaderBar}>
          <TouchableOpacity
            style={styles.menuIcon}
            onPress={this.goBack}
          >
            <Icon name="arrow-left" size={30} color="#FFF"/>
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
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    history: state.history
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchHistory: () =>{
      dispatch(GetHistoryTypes.getHistoryRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonitorScreen)
