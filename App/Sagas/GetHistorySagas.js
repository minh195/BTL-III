import { call, put } from 'redux-saga/effects'
import GetHistoryActions from '../Redux/GetHistoryRedux'

// import { GetHistorySelectors } from '../Redux/GetHistoryRedux'

export function * getGetHistory (api, action) {
  const { data } = action
  const response = yield call(api.getHistory)
  console.log('response history:', response)
  // success?
  if (response.ok) {
    yield put(GetHistoryActions.getHistorySuccess(response.data))
  } else {
    yield put(GetHistoryActions.getHistoryFailure())
  }
}
