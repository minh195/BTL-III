import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'
import styles from './Styles/RenderListDeviceStyle'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class RenderListDevice extends Component {

  constructor (props) {
    super(props)
    this.state = {
      id: null,
      para: null,
      dateTime: null
    }
  }

  componentDidMount () {
    this.setState({
      id: this.props.item.id,
      para: this.props.item.parameter,
      dateTime: this.props.item.date_time
    })
  }

  handleNavigate = () => {
    this.props.handleNavigate2(this.state.id, this.state.para, this.state.dateTime)
  }

  render () {
    let { item } = this.props
    return (
      <View>
        <TouchableOpacity
          style={[styles.container, styles.flexRow]}
          onPress={this.handleNavigate}
        >
          <Image source={{ uri: item.image }} style={styles.imageStyle}/>
          <View style={styles.textContainer}>
            <Text style={styles.textName}>{item.name}</Text>
            <View style={[styles.flexRow, styles.locationContent]}>
              {item.status && <Icon name={'check-circle'} size={15} color="green"/>}
              {item.status && <Text style={{ color: 'green', marginLeft: 5 }}>Active</Text>}
              {!item.status && <Icon name={'exclamation-triangle'} size={15} color="gray"/>}
              {!item.status && <Text style={{ color: 'gray', marginLeft: 5 }}>Not active</Text>}
            </View>
            <View style={[styles.flexRow, styles.locationContent]}>
              <Icon name={'map-marker'} size={15} color="#82C91E"/>
              <Text style={{ marginLeft: 5 }}>{item.lat}, {item.lng}</Text>
            </View>
          </View>
          <Icon name={'chevron-right'} size={20} color="#495057" style={styles.IconDetail}/>
        </TouchableOpacity>
        <View style={styles.line}/>
      </View>
    )
  }
}
