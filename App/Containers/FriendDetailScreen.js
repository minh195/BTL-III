import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Image
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
// Styles
import styles from './Styles/FriendDetailScreenStyle'
import { NavigationActions } from 'react-navigation'

class FriendDetailScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      friendDetail: {}
    }
  }

  componentDidMount () {
    const { navigation } = this.props
    const dataReceiver = navigation.getParam('friendDetail', 'friendData')
    console.log(dataReceiver)
    this.setState((state) => {
      return { friendDetail: dataReceiver }
    })
  }

  _renderItem = () => {
    return (
      <View
        style={styles.imageFlatList}>
        <Image source={{ uri: this.state.friendDetail.url_cmt1 }}
               style={styles.imageRecent}/>
      </View>
    )
  }
  _handleGoBack = () => this.props.navigation.dispatch(NavigationActions.back())

  render () {
    console.log('Passing parameters to routes: ', this.state.friendDetail)
    const dataReceive = this.state.friendDetail
    return (
      <View style={styles.container}>
        <ImageBackground source={{ uri: dataReceive.url_avatar }}
                         style={styles.friendAvatar}>
          <TouchableOpacity onPress={this._handleGoBack}>
            <View style={styles.backIcon}>
              <Icon name="arrow-circle-left" size={25} color="#82C91E"/>
            </View>
          </TouchableOpacity>
        </ImageBackground>
        <View>
          <View style={styles.infoContainer}>
            <View style={styles.infoHeader}>
              <Text style={styles.fullNameText}>{dataReceive.fullname}</Text>
              <Text style={styles.companyText}>{dataReceive.company_name}</Text>
            </View>
            <View style={styles.counterContainer}>
              <View>
                <Text style={styles.textNumber}>5,485</Text>
                <Text>Followers</Text>
              </View>
              <View>
                <Text style={styles.textNumber}>3,219</Text>
                <Text>Following</Text>
              </View>
              <View>
                <Text style={styles.textNumber}>140</Text>
                <Text>Shots</Text>
              </View>
            </View>
          </View>
          <View style={styles.followButton}>
            <TouchableOpacity style={styles.followTouch}>
              <Text style={styles.followText}>+ Follow</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footerContainer}>
          <Text>Recent shots</Text>
          <View style={styles.flatListContainer}>
            <FlatList
              data={[
                { key: 1 },
                { key: 2 },
                { key: 3 },
                { key: 4 }
              ]}
              renderItem={this._renderItem}
              horizontal={true}/>
          </View>
          <View/>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(FriendDetailScreen)
