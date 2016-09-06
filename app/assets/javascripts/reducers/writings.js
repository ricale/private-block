import {
  FETCH_WRITING_LIST_SUCCESS, FETCH_WRITING_LIST_FAILURE,
  FETCH_WRITING_SUCCESS,      FETCH_WRITING_FAILURE,
  CREATE_WRITING_SUCCESS,     CREATE_WRITING_FAILURE,
  UPDATE_WRITING_SUCCESS,     UPDATE_WRITING_FAILURE,
  DELETE_WRITING_SUCCESS,     DELETE_WRITING_FAILURE
} from '../constants/ActionType'

const initWritingState = {
  list: [],
  selected: undefined
}

export function writings (state = initWritingState, action) {
  switch (action.type) {
  case FETCH_WRITING_LIST_SUCCESS:
    const { list, page, totalPage } = action.writings
    return Object.assign({}, state, {
      list: action.writings.list,
      page,
      totalPage
    })

  case FETCH_WRITING_SUCCESS:
  case CREATE_WRITING_SUCCESS:
  case UPDATE_WRITING_SUCCESS:
  case DELETE_WRITING_SUCCESS:
    const { selected } = action.writings
    return Object.assign({}, state, {
      selected
    })

  default:
    return state
  }
}
