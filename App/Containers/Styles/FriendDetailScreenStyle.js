import { Dimensions, StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

const heights = Dimensions.get('window').height
const widths = Dimensions.get('window').width
export default StyleSheet.create({
  friendAvatar: {
    width: widths,
    height: 0.5 * heights
  },
  textNumber: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textInfo: {
    textAlign: 'center'
  },
  flatListItem: {
    color: 'white',
    padding: 10,
    fontSize: 16,
  },
  imageFlatList: {
    padding: 10
  },
  imageRecent: {
    width: 110,
    height: 80
  },
  backIcon: {
    marginTop: 20,
    marginLeft: 20
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  infoContainer: {
    width: 300,
    height: 180,
    backgroundColor: 'blue',
    marginTop: -40,
    borderRadius: 10
  },
  infoHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.5,
    borderTopColor: '#CDD4DA',
    borderRightWidth: 0.5,
    borderRightColor: '#CDD4DA',
    borderLeftWidth: 0.5,
    borderLeftColor: '#CDD4DA'
  },
  fullNameText: {
    color: 'black',
    fontSize: 24
  },
  companyText: {
    fontSize: 14
  },
  counterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 90,
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 0.5,
    borderBottomColor: '#CDD4DA',
    borderRightWidth: 0.5,
    borderRightColor: '#CDD4DA',
    borderLeftWidth: 0.5,
    borderLeftColor: '#CDD4DA'
  },
  followButton: {
    alignItems: 'center',
    marginTop: -20,
  },
  followTouch: {
    width: 120,
    height: 35,
    backgroundColor: '#22AD8C',
  },
  followText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    paddingTop: 5
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 20
  },
  flatListContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  widthDivThree: {
    width: '33%'
  }
})
