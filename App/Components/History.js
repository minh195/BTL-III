import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/HistoryStyle'
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'

export default class History extends Component {

  render () {
    const data = [50, 60, 40, 95, 100, 120, 85, 91, 50, 53, 53, 40, 50, 40, 80]
    const axesSvg = { fontSize: 10, fill: 'grey' }
    const verticalContentInset = { top: 10, bottom: 10 }
    const xAxisHeight = 30
    return (
      <View style={styles.container2}>
        <View>
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
        </View>
      </View>
    )
  }
}
