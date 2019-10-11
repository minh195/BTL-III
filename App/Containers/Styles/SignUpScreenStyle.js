import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: '#EFF5FF'
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  origamiBird: {
    height: 80,
    width: 90
  },
  backgroundLogin: {
    height: 350,
    width: 300
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100
  },
  inputContainer: {
    borderBottomColor: 'lightblue',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 35,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',

  }, inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  }, inputIcon: {
    width: 16,
    height: 20,
    marginLeft: 15,
    justifyContent: 'center',
  },
  goBackIcon: {
    width: 30,
    height: 30,
  },
  loginContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 120
  },
  imageBackgroundLogin: {
    height: 350,
    width: 300
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signUpButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 28
  },
  footerContainer: {
    marginRight: 250
  }
})
