import {
  FETCH_WRITING_SUCCESS,
} from '../constants/ActionType'

const initCategoryState = {
  list: [],
}

export function categories (state = initCategoryState, action) {
  switch (action.type) {
  case FETCH_WRITING_SUCCESS:
    if(action.categories) {
      return Object.assign({}, state, {
        list: action.categories.list
      })

    } else {
      return state
    }

  default:
    return state
  }
}