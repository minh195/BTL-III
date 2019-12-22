import { Dimensions, StyleSheet } from 'react-native'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width
export default StyleSheet.create({
  container: {
    flex: 1
  },
  textName: {
    fontWeight: 'bold',
    color: 'white',
    fontStyle: 'italic',
    fontSize: 20,
    alignItems: 'center'
  },
  menuIcon: {
    padding: 10
  },
  textContent: {
    alignItems: 'center'
  },
  bellIcon: {
    padding: 10,
    marginTop: 5
  },
  backgroundHeaderBar: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
})
