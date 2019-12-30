import { Dimensions, StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
export default StyleSheet.create({
  backgroundHeaderBar: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  menuIcon: {
    paddingLeft:10,
    paddingBottom: 1
  },
  textName: {
    fontWeight: 'bold',
    color: 'white',
    fontStyle: 'italic',
    fontSize: 20,
    alignItems: 'center'
  },
  bellIcon: {
    padding: 10,
    marginTop: 5
  },
  txDeviceList:{
    marginTop:10,
    paddingHorizontal: 10,
    fontSize: 18
  },
  searchContainer:{
    backgroundColor:'white',
    width: width-60,
    height: height/13,
    marginTop: 20,
    marginBottom: 20,
    alignSelf:'center',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex:1,
    paddingHorizontal: 30
  },
  textInput:{
    borderColor:'white'
  }
})
