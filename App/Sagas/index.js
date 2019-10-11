import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'

/* ------------- Types ------------- */

import { SignInTypes } from '../Redux/SignInRedux'
import {GetFriendLocationTypes} from '../Redux/GetFriendLocationRedux'
/* ------------- Sagas ------------- */

import { getSignIn } from './SignInSagas'
import { getGetFriendLocation } from './GetFriendLocationSagas'
import AsyncStorage from '@react-native-community/async-storage'
/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
export const api = API.create()

/* ------------- Connect Types To Sagas ------------- */
AsyncStorage.getItem('userToken').then((value => {
  api.api.setHeader('Authorization', `Bearer ${value}`)
}))
export default function * root () {
  yield all([
    // some sagas receive extra parameters in addition to an action
    takeLatest(SignInTypes.SIGN_IN_REQUEST, getSignIn, api),
    takeLatest(GetFriendLocationTypes.GET_FRIEND_LOCATION_REQUEST, getGetFriendLocation, api)
  ])
}
