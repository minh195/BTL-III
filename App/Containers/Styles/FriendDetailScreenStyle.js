import { Dimensions, StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

const heights = Dimensions.get('window').height
const widths = Dimensions.get('window').width
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  friendAvatar: {
    width: widths,
    height: 0.5 * heights
  },
  textNumber:{
    fontWeight:'bold',
    color:'black',
    textAlign:'center'
  },
  flatListItem: {
    color: 'white',
    padding: 10,
    fontSize: 16,
  }
})
