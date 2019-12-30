import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'

/* ------------- Types ------------- */

import { SignInTypes } from '../Redux/SignInRedux'
import { GetFriendLocationTypes } from '../Redux/GetFriendLocationRedux'
import { GetMessageTypes } from '../Redux/GetMessageRedux'
import { GetDeviceListTypes } from '../Redux/GetDeviceListRedux'
import { GetHistoryTypes } from '../Redux/GetHistoryRedux'
import { DoctorTypes } from '../Redux/DoctorRedux'
import { GetUserByDoctorTypes } from '../Redux/GetUserByDoctorRedux'
import { GetUserByIdTypes } from '../Redux/GetUserByIdRedux'
/* ------------- Sagas ------------- */

import { getSignIn } from './SignInSagas'
import { getGetFriendLocation } from './GetFriendLocationSagas'
import { AsyncStorage } from 'react-native'
import { getMessage } from './GetMessageSagas'
import { getGetDeviceList } from './GetDeviceListSagas'
import { getGetHistory } from './GetHistorySagas'
import { getDoctor } from './DoctorSagas'
import { getGetUserByDoctor } from './GetUserByDoctorSagas'
import { getGetUserById } from './GetUserByIdSagas'
/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
export const api = API.create()
export const api2 = API.create2()
// export const api3 = API.create3()

/* ------------- Connect Types To Sagas ------------- */
AsyncStorage.getItem('userToken').then((value => {
  api.api.setHeader('Authorization', `Bearer ${value}`)
}))
export default function * root () {
  yield all([
    // some sagas receive extra parameters in addition to an action
    takeLatest(SignInTypes.SIGN_IN_REQUEST, getSignIn, api),
    takeLatest(GetFriendLocationTypes.GET_FRIEND_LOCATION_REQUEST, getGetFriendLocation, api),
    takeLatest(GetMessageTypes.GET_MESSAGE_REQUEST, getMessage, api2),
    takeLatest(GetDeviceListTypes.GET_DEVICE_LIST_REQUEST, getGetDeviceList, api),
    takeLatest(GetHistoryTypes.GET_HISTORY_REQUEST, getGetHistory, api),
    takeLatest(DoctorTypes.DOCTOR_REQUEST, getDoctor, api),
    takeLatest(GetUserByDoctorTypes.GET_USER_BY_DOCTOR_REQUEST, getGetUserByDoctor, api),
    takeLatest(GetUserByIdTypes.GET_USER_BY_ID_REQUEST, getGetUserById, api)
  ])
}
