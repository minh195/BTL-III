import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
// Styles
import styles from './Styles/FriendDetailScreenStyle'
class FlatListItem extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection:'column',
      }}>
        <View style={{
          flex: 1,
          flexDirection:'row',
          // backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen': 'tomato'
          backgroundColor: 'mediumseagreen'
        }}>
          <Image
            source={{uri: this.props.item.imageUrl}}
            style={{width: 100, height: 100, margin: 5}}
          >

          </Image>
          <View style={{
            flex: 1,
            flexDirection:'column',
            height: 100
          }}>
            <Text style={styles.flatListItem}>{this.props.item.name}</Text>
            <Text style={styles.flatListItem}>{this.props.item.foodDescription}</Text>
          </View>
        </View>
        <View style={{
          height: 1,
          backgroundColor:'white'
        }}>

        </View>
      </View>
    );
  }
}
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

  _renderItem = ({ item }) => {
    return (
      <View
        style={{
          padding: 16,
          backgroundColor: 'green',
          width: 110,
          height: 80,
        }}>
        <Text>{item.key}</Text>
      </View>
    )
  }

  render () {
    console.log('Passing parameters to routes: ', this.state.friendDetail)
    const { goBack } = this.props.navigation
    const dataReceive=this.state.friendDetail
    return (

      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>

        <ImageBackground source={{uri:dataReceive.url_avatar}}
                         style={styles.friendAvatar}>
          <TouchableOpacity
            onPress={() => goBack()}
          >
            <View style={{
              marginTop: 20,
              marginLeft: 20
            }}>
              <Icon name="long-arrow-left" size={25} color="#FFFFFF"/>
            </View>
          </TouchableOpacity>
        </ImageBackground>
        <View>
          <View style={{
            width: 300,
            height: 180,
            backgroundColor: 'blue',
            marginTop: -40,
            borderRadius: 10
          }}>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: 90,
              backgroundColor: '#FFFFFF'
            }}>
              <Text style={{ color: 'black', fontSize: 24 }}>{dataReceive.fullname}</Text>
              <Text style={{ color: 'black', fontSize: 14 }}>{dataReceive.company_name}</Text>
            </View>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              height: 90,
              backgroundColor: '#F8F8F8'
            }}>
              <View style={{}}>
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
          <View style={{
            alignItems: 'center',
            marginTop: -20,
          }}>
            <TouchableOpacity style={{
              width: 120,
              height: 35,
              backgroundColor: '#22AD8C',
            }}>
              <Text style={{
                fontSize: 16,
                color: 'white',
                textAlign: 'center',
                paddingTop: 5
              }}>+ Follow</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{
          flex: 1,
          justifyContent: 'flex-end',
          marginTop: 20
        }}>
          <View>
            <Text>Recent shots</Text></View>
          <View style={{
            flex: 1,
            justifyContent: 'flex-end'
          }}>
            <FlatList
              data={[{ key: 1 }, { key: 2 }, { key: 3 }]}
              renderItem={this._renderItem}
              horizontal={true}
              ItemSeparatorComponent={() => <View style={{ margin: 4 }}/>}
            />

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
