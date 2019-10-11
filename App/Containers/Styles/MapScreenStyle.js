import { Dimensions, StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

const heights = Dimensions.get('window').height
const widths = Dimensions.get('window').width
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  markerAvatar: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
    margin: 3,
  },
  markerName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000000',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  maker: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 100,
    backgroundColor: 'white',
    borderRadius: 20
  },
  mapContainer: {
    height: heights,
    width: widths,
  },
  signOutButton: {
    flexDirection: 'row',
    marginVertical: 20,
    marginLeft: 20,
    backgroundColor: 'transparent',
    position: 'absolute'
  }
})
