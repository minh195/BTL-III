import React, { Component } from 'react'
import { Text, Platform, View, Button, Dimensions } from 'react-native'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/HistoryScreenStyle'
import { Path } from 'react-native-svg'
import { AreaChart, Grid, XAxis, YAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import DateTimePicker from '@react-native-community/datetimepicker'
const { height, width } = Dimensions.get('window')
class HistoryScreen extends Component {
  state = {
    date: new Date(),
    mode: 'date',
    show: false,
  }

  setDate = (event, date) => {
    date = date || this.state.date;

    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date,
    });
  }

  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  }

  datepicker = () => {
    this.show('date');
  }

  render () {
    console.log('data history passed: ', this.state.date)
    const data = [50, 82, 96, 68, 63, 86, 87, 98, 102]
    const dataDate = [
      {
        'id': '1',
        'date_time': '2019-02-10T20:46:25.742Z',
        'para': 49156,
        'device_id': '4'
      },
      {
        'id': '2',
        'date_time': '2019-11-03T03:49:59.949Z',
        'para': 44725,
        'device_id': '4'
      },
      {
        'id': '3',
        'date_time': '2019-05-11T03:50:50.875Z',
        'para': 45336,
        'device_id': '4'
      },
      {
        'id': '4',
        'date_time': '2019-09-23T01:43:15.042Z',
        'para': 26684,
        'device_id': '4'
      },
      {
        'id': '5',
        'date_time': '2018-12-30T09:14:58.623Z',
        'para': 20051,
        'device_id': 74
      },
      {
        'id': '6',
        'date_time': '2019-01-24T07:16:22.429Z',
        'para': 65527,
        'device_id': 17
      },
      {
        'id': '7',
        'date_time': '2019-07-27T17:44:17.778Z',
        'para': 92385,
        'device_id': 7
      },
      {
        'id': '8',
        'date_time': '2019-09-24T01:55:49.121Z',
        'para': 82598,
        'device_id': 14
      },
    ]
    const { show, date, mode } = this.state
    //const dataDate = ['monday', 'Tuesday','monday', 'Tuesday', 'monday', 'Tuesday', 'monday', 'Tuesday', 'Tuesday' ]
    const axesSvg = { fontSize: 10, fill: 'grey' }
    const verticalContentInset = { top: 10, bottom: 10 }
    const xAxisHeight = 30
    const Line = ({ line }) => (
      <Path
        key={'line'}
        d={line}
        stroke={'rgb(134, 65, 244)'}
        fill={'none'}
      />
    )

    return (
      <View style={styles.container2}>
        <View>
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
              <XAxis
                style={{ marginHorizontal: -10, height: xAxisHeight }}
                data={dataDate}
                xAccessor={({ item }) => item.para}
                formatLabel={(value) => "Thứ" + value}
                contentInset={{ left: 10, right: 10 }}
                svg={axesSvg}
              />
            </View>
          </View>
          <View style={styles.bottomValueContainer}>
            <View>
              <Text>
                Min
              </Text>
              <Text>
                50
              </Text>
            </View>
            <View>
              <Text>
                Max
              </Text>
              <Text>
                120
              </Text>
            </View>
            <View>
              <Text>
                Avg
              </Text>
              <Text>
                70
              </Text>
            </View>
          </View>
          <Text> {(this.state.date).toString()}</Text>
          <View>
            <Button onPress={this.datepicker} title="Show date picker!" />
          </View>
          { show && <DateTimePicker value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={this.setDate} />
          }
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen)
