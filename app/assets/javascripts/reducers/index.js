import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux';
import {
  FETCH_WRITING_LIST_SUCCESS,
  FETCH_NEW_WRITING_SUCCESS
} from '../constants/ActionType'

const initWritingState = {
  list: [],
  new: {}
}

function writings (state = initWritingState, action) {
  switch (action.type) {
  case FETCH_WRITING_LIST_SUCCESS:
    return Object.assign({}, state, {
      list: action.writings.list
    })

  case FETCH_NEW_WRITING_SUCCESS:
    return Object.assign({}, state, {
      new: actions.writings.new
    })

  default:
    return state
  }
}

const initCategoryState = {
  list: [],
  new: {}
}

function categories (state = initCategoryState, action) {
  switch (action.type) {
  case FETCH_NEW_WRITING_SUCCESS:
    return Object.assign({}, state, {
      list: action.categories.list
    })

  default:
    return state
  }
}

const rootReducer = combineReducers({
  writings,
  categories,
  routing
});

export default rootReducer;
