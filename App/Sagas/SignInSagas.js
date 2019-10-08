import { call, put } from 'redux-saga/effects'
import SignInActions from '../Redux/SignInRedux'

// import { SignInSelectors } from '../Redux/SignInRedux'

export function * getSignIn (api, action) {
  console.log(action)
  const { data } = action
  // get current data from Store
  // const currentData = yield select(SignInSelectors.getData)
  // make the call to the api
  console.log(data)
  const response = yield call(api.getUser, data)
  console.log('response from call api saga',response)
  // success?
  if (response.ok) {
    console.log('insert to payload')
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(SignInActions.signInSuccess(response.data))

  } else {
    yield put(SignInActions.signInFailure())
  }
}
