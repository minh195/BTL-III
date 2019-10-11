import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

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
})
