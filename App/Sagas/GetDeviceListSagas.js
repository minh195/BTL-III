import { call, put } from 'redux-saga/effects'
import GetDeviceListActions from '../Redux/GetDeviceListRedux'

export function * getGetDeviceList (api, action) {
  const { data } = action
  const response = yield call(api.getDevice, data)
  console.log("Get device list: ", response)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(GetDeviceListActions.getDeviceListSuccess(response.data))
  } else {
    yield put(GetDeviceListActions.getDeviceListFailure())
  }
}
