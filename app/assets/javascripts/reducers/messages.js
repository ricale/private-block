import {
  FETCH_WRITING_LIST_FAILURE,
  FETCH_WRITING_FAILURE,
  CREATE_WRITING_FAILURE,
  UPDATE_WRITING_FAILURE,
  DELETE_WRITING_FAILURE
} from '../constants/ActionType'

export function messages (state = [], action) {
  const { status, message } = action

  switch(action.type) {
  case FETCH_WRITING_LIST_FAILURE:
  case FETCH_WRITING_FAILURE:
  case CREATE_WRITING_FAILURE:
  case UPDATE_WRITING_FAILURE:
  case DELETE_WRITING_FAILURE:
    var newState = Object.assign([], state)
    newState.push(message)
    return newState
  default:
    return []
  }
}