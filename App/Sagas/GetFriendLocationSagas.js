import { call, put } from 'redux-saga/effects'
import GetFriendLocationActions from '../Redux/GetFriendLocationRedux'

// import { GetFriendLocationSelectors } from '../Redux/GetFriendLocationRedux'

export function * getGetFriendLocation (api, action) {
  const { data } = action
  const response = yield call(api.getFriend)
  console.log(response)
  // success?
  if (response.ok) {
    yield put(GetFriendLocationActions.getFriendLocationSuccess(response.data))
  } else {
    yield put(GetFriendLocationActions.getFriendLocationFailure())
  }
}
