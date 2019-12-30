import { Dimensions, StyleSheet } from 'react-native'

const width = Dimensions.get('window').width
export default StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#CDD4DA',
    backgroundColor: 'white',
  },
  flexRow: {
    flexDirection: 'row'
  },
  imageStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textName: {
    fontSize: 18,
    color: '#030303'
  },
  textEmail: {
    fontSize: 16,
    color: '#ABABAB'
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'lightgray'
  },
  textContainer: {
    marginLeft: 10,
    marginTop: -5
  },
  locationContent: {
    alignItems: 'center'
  },
  IconDetail: {
    position: 'absolute',
    right: 6,
    top: 5
  }
})
