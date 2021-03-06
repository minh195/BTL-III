import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20,
  },
  navigationName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#e2e2e2',
    marginTop: 15,
  },
  sideMenuProfileIcon: {
    width: 150,
    height: 150,
    marginTop: 20,
    borderRadius: 150 / 2,
  },
  buttonLogOut: {
    marginTop: 10
  },
  textContent: {
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
    paddingBottom: 10,
    width: '100%',
    marginBottom: 10,
    alignItems: 'center'
  },
  textEmail: {
    marginTop: 5,
    paddingHorizontal: 20,
    textAlign: 'center'
  }
})
