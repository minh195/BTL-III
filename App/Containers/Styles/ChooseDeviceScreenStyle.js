import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

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
    padding: 10
  },
  txDeviceList:{
    marginTop:10,
    paddingHorizontal: 10,
    fontSize: 18
  }
})
