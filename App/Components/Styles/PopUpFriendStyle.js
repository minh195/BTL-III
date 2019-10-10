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
    width: 50,
    height: 50,
    borderRadius:30
  }, topImage: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }, buttonNext: {
    backgroundColor: '#F65973',
    width: 70,
    height: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',

  }, textNext: {
    color: 'white',
    fontSize: 14,
  }, textSkip: {
    color: '#F65973',
    fontSize: 20,
    fontWeight: 'bold'
  }, textWelcome: {
    fontSize: 20,

    color:'black'
  }, textIntro: {
    fontSize: 20,
    textAlign: 'center',
    padding: 15,
    marginTop: 40,
  }
})
