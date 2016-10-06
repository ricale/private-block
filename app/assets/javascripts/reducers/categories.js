import {
  FETCH_WRITING_SUCCESS,
  FETCH_WRITING_LIST_SUCCESS,
  FETCH_CATEGORY_LIST_SUCCESS,
  FETCH_CATEGORY_SUCCESS,
  CREATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAILURE
} from '../constants/ActionType'

const initCategoryState = {
  list: [],
}

export function categories (state = initCategoryState, action) {
  switch (action.type) {
  case FETCH_WRITING_SUCCESS:
  case FETCH_WRITING_LIST_SUCCESS:
  case FETCH_CATEGORY_LIST_SUCCESS:
  case CREATE_CATEGORY_SUCCESS:
  case UPDATE_CATEGORY_SUCCESS:
  case DELETE_CATEGORY_SUCCESS:
    const { categories } = action
    if(categories) {
      return Object.assign({}, state, {
        list: categories.list
      })

    } else {
      return state
    }


  case FETCH_CATEGORY_SUCCESS:
    const { selected, parents } = action.categories
    return Object.assign({}, state, {
      selected,
      parents
    })

  default:
    return state
  }
}
