import {
  FETCH_WRITING_LIST_SUCCESS,
  FETCH_WRITING_SUCCESS,
  CREATE_WRITING_SUCCESS,
  UPDATE_WRITING_SUCCESS,
  DELETE_WRITING_SUCCESS
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
