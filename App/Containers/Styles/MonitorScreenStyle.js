import { Dimensions, StyleSheet } from 'react-native'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width
export default StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundHeaderBar: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
    padding: 10
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  valueContent: {
    alignItems: 'center'
  },
  valueText: {
    fontSize: 60
  },
  unitText: {
    color: 'gray'
  },
  heartBeatGif: {
    height: 152 * 1.2,
    width: 181 * 1.2
  },
  heartBeatWaveGif: {
    height: 89 * 1.2,
    width: 216 * 1.5
  },
  tabHotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: deviceHeight * 0.1,
  },
  navigateButton: {
    alignItems: 'center',
  },
  navigateText: {
    alignSelf: 'center'
  },
  chooseView: {
    height: 2,
    width: deviceWidth * 0.25,
    backgroundColor: '#FF6969',
    position: 'absolute',
    bottom: -10
  }
})
