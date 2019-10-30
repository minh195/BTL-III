import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
  },
  logoLaunch: {
    height: 120,
    width: 200,
    alignSelf: 'center'
  },
  buttonStyle: {
    backgroundColor: '#005DBD',
    height: 40,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize:16
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20
  }
})
