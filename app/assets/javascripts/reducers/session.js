import {
  FETCH_SESSION_SUCCESS,
} from '../constants/ActionType'

export function session (state = {}, action) {
  switch (action.type) {
  case FETCH_SESSION_SUCCESS:
    return Object.assign({}, state, action.session)

  default:
    return state;
  }
}
