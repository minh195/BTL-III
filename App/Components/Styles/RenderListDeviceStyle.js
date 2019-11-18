import { StyleSheet, Dimensions } from 'react-native'

const width = Dimensions.get('window').width
export default StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: width*0.9,
    margin: 10,
    borderRadius: 10,
    marginLeft: 15,
    padding: 5
  },
  flexRow: {
    flexDirection: 'row'
  },
  imageStyle: {
    width: 80,
    height: 60,
    borderRadius: 10
  },
  textName: {
    fontSize: 16,
    color: 'black'
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'lightgray'
  },
  textContainer: {
    marginLeft: 10
  },
  locationContent: {
    alignItems: 'center'
  },
  IconDetail:{
    position: 'absolute',
    right: 6,
    top:5
  }
})
