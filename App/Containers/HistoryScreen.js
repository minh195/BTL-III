import React, { Component } from 'react'
import {
  Text,
  Platform,
  View,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import { Path } from 'react-native-svg'
import { AreaChart, Grid, YAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import DateTimePicker from '@react-native-community/datetimepicker'
import GetHistoryTypes from '../Redux/GetHistoryRedux'
import Icon from 'react-native-vector-icons/FontAwesome'
// Styles
import styles from './Styles/HistoryScreenStyle'
import NoData from '../Components/NoData'
import Loading from '../Components/Loading'

const { height } = Dimensions.get('window')

class HistoryScreen extends Component {
  state = {
    date: new Date(),
    mode: 'date',
    show: false,
    historyData: [],
    dataLine: [],
    dataHour: [],
    min: null,
    max: null,
    avg: null
  }

  componentDidMount () {
    this.props.onFetchHistory()
  }

  getDataByDate = async () => {
    await this.state.historyData.map((item, index) => {
      let dateConfig = JSON.stringify(item.date_time).split('T')[0].replace('"', '')
      if (dateConfig === JSON.stringify(this.state.date).split('T')[0].replace('"', '')) {
        this.setState({
          dataLine: [...this.state.dataLine, item.para],
        })
      }
    })
  }
  saveHistory = async (nextProps, response) => {
    await response.map((item, index) => {
      if (item.device_id.toString() === this.props.idDevice) {
        this.state.historyData.push(item)
      }
    })
    this.getDataByDate()
  }

  componentWillReceiveProps (nextProps) {
    const response = nextProps.history.payload
    if (response != null) {
      this.saveHistory(nextProps, response).then()
    }
  }

  setDate = (event, date) => {
    date = date || this.state.date

    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date,
      dataLine: []
    })
    this.getDataByDate().then(r => {})
  }

  show = mode => {
    this.setState({
      show: true,
      mode,
    })
  }

  datepicker = () => {
    this.show('date')
  }

  render () {
    const data = this.state.dataLine
    const { show, date, mode } = this.state
    const axesSvg = { fontSize: 10, fill: 'grey' }
    const verticalContentInset = { top: 10, bottom: 10 }
    const xAxisHeight = 30
    const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length
    const Line = ({ line }) => (
      <Path
        key={'line'}
        d={line}
        stroke={'rgb(134, 65, 244)'}
        fill={'none'}
      />
    )
    const renderItemValue = (txt, value) => {
      return (
        <View style={{ width: 80 }}>
          <Text style={{ textAlign: 'center' }}>
            {txt}
          </Text>
          <Text style={{ textAlign: 'center' }}>
            {value}
          </Text>
        </View>
      )
    }
    const renderNoData = () => {
      if (data.length === 0 && !this.props.history.fetching) {
        return (
          <NoData/>
        )
      }
    }
    return (
      <View style={styles.container2}>
        {!this.props.history.fetching && <View style={styles.iconView}>
          <Text
            style={{ textAlign: 'center' }}>{(this.state.date).toString().split(' ')[0]} {(this.state.date).toString().split(' ')[1]} {(this.state.date).toString().split(' ')[2]}, {(this.state.date).toString().split(' ')[3]}</Text>
          <TouchableOpacity onPress={this.datepicker} style={styles.iconPickDate}>
            <Icon name="calendar" size={24} color="gray"/>
          </TouchableOpacity>
        </View>}
        {renderNoData()}
        {data.length !== 0 && <View>
          <View style={{ height: height / 2.5, padding: 20, flexDirection: 'row' }}>
            <YAxis
              data={data}
              style={{ marginBottom: xAxisHeight }}
              contentInset={verticalContentInset}
              svg={axesSvg}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <AreaChart
                style={{ flex: 1 }}
                data={data}
                contentInset={verticalContentInset}
                curve={shape.curveNatural}
                svg={{ stroke: 'rgb(134, 65, 244)' }}
              >
                <Grid/>
                <Line/>
              </AreaChart>
            </View>
          </View>

        </View>}
        {this.state.dataLine.length !== 0 && <View style={styles.bottomValueContainer}>
          {renderItemValue('Min', Math.min.apply(Math, data))}
          {renderItemValue('Max', Math.max.apply(Math, data))}
          {renderItemValue('Avg', parseInt(arrAvg(data)))}
        </View>}
        {show && <DateTimePicker value={date}
                                 mode={mode}
                                 is24Hour={true}
                                 display="default"
                                 onChange={this.setDate}/>
        }
        <View style={{marginTop:30}}>{this.props.history.fetching && <Loading/>}</View>
      </View>
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
    onFetchHistory: () => {
      dispatch(GetHistoryTypes.getHistoryRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen)
