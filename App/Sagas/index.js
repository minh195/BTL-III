import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'

/* ------------- Types ------------- */

import {SignInTypes} from '../Redux/SignInRedux'

/* ------------- Sagas ------------- */

import {getSignIn} from './SignInSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas receive extra parameters in addition to an action
    takeLatest(SignInTypes.SIGN_IN_REQUEST, getSignIn, api)
  ])
}
