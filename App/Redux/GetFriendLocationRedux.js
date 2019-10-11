import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { reset } from 'enzyme/src/configuration'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getFriendLocationRequest: ['data'],
  getFriendLocationSuccess: ['payload'],
  getFriendLocationFailure: null,
  getFriendLocationClear: null
})

export const GetFriendLocationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const GetFriendLocationSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const clearData = state =>
  INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_FRIEND_LOCATION_REQUEST]: request,
  [Types.GET_FRIEND_LOCATION_SUCCESS]: success,
  [Types.GET_FRIEND_LOCATION_FAILURE]: failure,
  [Types.GET_FRIEND_LOCATION_CLEAR]: clearData
})
