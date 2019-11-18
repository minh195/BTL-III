import { call, put } from 'redux-saga/effects'
import GetMessageActions from '../Redux/GetMessageRedux'

export function * getMessage (api2, action) {
  const { data } = action
  const response = yield call(api2.getMess, data)
  // success?
  if (response.ok) {
    yield put(GetMessageActions.getMessageSuccess(response.data.trim()))
  } else {
    yield put(GetMessageActions.getMessageFailure())
  }
}



