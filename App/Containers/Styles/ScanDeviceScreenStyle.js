import { Dimensions, StyleSheet } from 'react-native'

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
    paddingLeft: 10,
    paddingBottom: 1
  },
  textName: {
    fontWeight: 'bold',
    color: 'white',
    fontStyle: 'italic',
    fontSize: 20,
    alignItems: 'center'
  },
  textNameBluetooth: {
    fontStyle: 'italic',
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 20
},
  bellIcon: {
    padding: 10,
    marginTop: 5
  },
  txDeviceList: {
    marginTop: 10,
    paddingHorizontal: 10,
    fontSize: 18
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  container: {
    flex: 1,
  }
})
