import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF5FF',
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'center'
  },
  keyBoardAvoidingView: {
    flex: 1
  },
  header: {
    flex: 0.3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  origamiBird: {
    height: 80,
    width: 90
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarUser: {
    height: 77,
    width: 77,
    zIndex: 10
  },
  topLoginFrom: {
    marginTop: -85,
    height: 119,
    width: 300,
    zIndex: 0
  },
  loginContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    backgroundColor: 'white',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: 20
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
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
    borderColor: 'black'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    zIndex: 90
  },
  inputIcon: {
    width: 16,
    height: 20,
    marginLeft: 15,
    justifyContent: 'center'
  },
  forgotButton: {
    marginLeft: 140
  },
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -10
  },
  forgotText: {
    fontSize: 12
  },
  messageText: {
    fontSize: 12,
    color: 'red'
  },
  footerButton: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerIcon: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 250
  },
  loginButton: {
    backgroundColor: '#73d0e2',
    height: 40,
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: -20,
    flexDirection: 'row',
    zIndex: 40
  },
  SignUpButton: {
    backgroundColor: '#73d0e2',
    height: 40,
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 20,
    flexDirection: 'row',
    zIndex: 40
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 5
  },
  signUpButton: {
    color: '#73d0e2',
    fontSize: 16
  },
  goBackIcon: {
    width: 40,
    height: 40

  }
})
