import { StyleSheet, Dimensions } from 'react-native'

let screen = Dimensions.get('window')
export default StyleSheet.create({
  popUpTransparent: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(52, 52, 52, 0.3)'
  },
  containerPopUp: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 10,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 450,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  popUpImage: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  topImage: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonNext: {
    backgroundColor: '#F65973',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 10
  },
  textNext: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  textSkip: {
    color: '#F65973',
    fontSize: 20,
    fontWeight: 'bold'
  },
  textWelcome: {
    fontSize: 20,
    color: 'black'
  },
  textIntro: {
    fontSize: 20,
    textAlign: 'center',
    padding: 15,
    marginTop: 40,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  birthDayText: {
    fontSize: 12
  },
  textContainer: {
    marginLeft: 10
  },
  avatar: {
    justifyContent: 'center',
    marginLeft: 25
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 25
  },
  imageShot: {
    height: 80,
    width: 180,
    borderRadius: 15
  },
  counterText: {
    color: 'gray',
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  }
})
