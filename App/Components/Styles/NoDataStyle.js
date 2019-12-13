import { Dimensions, StyleSheet } from 'react-native'
const { height, width } = Dimensions.get('window')
export default StyleSheet.create({
 image:{
   marginLeft: 20,
   marginTop: 50,
   width: width - 40,
   height: (width - 40) * 0.75,
   borderRadius: 20
 }
})
