import { call, put } from 'redux-saga/effects'
import GetUserByDoctorActions from '../Redux/GetUserByDoctorRedux'

// import { GetUserByDoctorSelectors } from '../Redux/GetUserByDoctorRedux'

export function * getGetUserByDoctor (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(GetUserByDoctorSelectors.getData)
  // make the call to the api
  const response = yield call(api.getUserByDoctor, data)
  console.log('response by doctor_code:', response)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(GetUserByDoctorActions.getUserByDoctorSuccess(response.data))
  } else {
    yield put(GetUserByDoctorActions.getUserByDoctorFailure())
  }
}
