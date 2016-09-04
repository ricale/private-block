import {
  FETCH_WRITING_LIST_SUCCESS,
  FETCH_WRITING_SUCCESS,
  CREATE_WRITING_SUCCESS,
  UPDATE_WRITING_SUCCESS
} from '../constants/ActionType'

const initWritingState = {
  list: [],
  selected: undefined
}

export function writings (state = initWritingState, action) {
  switch (action.type) {
  case FETCH_WRITING_LIST_SUCCESS:
    return Object.assign({}, state, {
      list: action.writings.list
    })

  case FETCH_WRITING_SUCCESS:
  case CREATE_WRITING_SUCCESS:
  case UPDATE_WRITING_SUCCESS:
    return Object.assign({}, state, {
      selected: action.writings.selected
    })

  default:
    return state
  }
}
