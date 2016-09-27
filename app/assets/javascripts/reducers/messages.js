import {
  FETCH_WRITING_LIST_FAILURE,
  FETCH_WRITING_FAILURE,
  CREATE_WRITING_FAILURE,
  UPDATE_WRITING_FAILURE,
  DELETE_WRITING_FAILURE,
  FETCH_CATEGORY_LIST_FAILURE,
  FETCH_CATEGORY_FAILURE,
  CREATE_CATEGORY_FAILURE,
  UPDATE_CATEGORY_FAILURE,
  DELETE_CATEGORY_FAILURE,
  CREATE_SESSION_FAILURE,
  DELETE_SESSION_FAILURE
} from '../constants/ActionType'

export function messages (state = [], action) {
  const { status, message } = action

  switch(action.type) {
  case FETCH_WRITING_LIST_FAILURE:
  case FETCH_WRITING_FAILURE:
  case CREATE_WRITING_FAILURE:
  case UPDATE_WRITING_FAILURE:
  case DELETE_WRITING_FAILURE:
  case CREATE_SESSION_FAILURE:
  case DELETE_SESSION_FAILURE:
  case FETCH_CATEGORY_LIST_FAILURE:
  case FETCH_CATEGORY_FAILURE:
  case CREATE_CATEGORY_FAILURE:
  case UPDATE_CATEGORY_FAILURE:
  case DELETE_CATEGORY_FAILURE:
    let newState = Object.assign([], state)
    newState.push(message)
    return newState
  default:
    return []
  }
}