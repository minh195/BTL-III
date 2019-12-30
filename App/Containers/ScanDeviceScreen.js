import React, { Component } from 'react'
import { ScrollView,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
  Image,
  View
} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ScanDeviceScreenStyle'
import { Images } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import images from '../Themes/Images'

class ScanDeviceScreen extends Component {
  goBack = () => {
    this.props.navigation.goBack()
  }
  render () {
    return (
      <View style={styles.container}>
        <ImageBackground source={Images.backgroundHeaderBar}
                         style={styles.backgroundHeaderBar}>
          <TouchableOpacity
            onPress={this.goBack}
            style={styles.menuIcon}
          >
            <Icon name="arrow-left" size={30} color="#FFF"/>
          </TouchableOpacity>
         <Text style={styles.textName}>Quét thiết bị</Text>
          <TouchableOpacity style={styles.bellIcon}>
            {/*<Icon name="bell" size={25} color="#FFF"/>*/}
          </TouchableOpacity>
        </ImageBackground>
        <Text style={styles.textNameBluetooth}>Bật bluetooth trên thiết bị để kết nối</Text>
        <View style={styles.center}>
          <Image source={images.searching} style={{height:105, width: 105}}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ScanDeviceScreen)
