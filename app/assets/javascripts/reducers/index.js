import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux';
import {
  FETCH_WRITING_LIST_SUCCESS,
  FETCH_WRITING_SUCCESS,
  FETCH_SESSION_SUCCESS,
  CREATE_WRITING_SUCCESS
} from '../constants/ActionType'

const initWritingState = {
  list: [],
  selected: undefined
}

function session (state = {}, action) {
  switch (action.type) {
  case FETCH_SESSION_SUCCESS:
    return Object.assign({}, state, action.session)

  default:
    return state;
  }
}

function writings (state = initWritingState, action) {
  switch (action.type) {
  case FETCH_WRITING_LIST_SUCCESS:
    return Object.assign({}, state, {
      list: action.writings.list
    })

  case FETCH_WRITING_SUCCESS:
  case CREATE_WRITING_SUCCESS:
    return Object.assign({}, state, {
      selected: action.writings.selected
    })

  default:
    return state
  }
}

const initCategoryState = {
  list: [],
}

function categories (state = initCategoryState, action) {
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

const rootReducer = combineReducers({
  session,
  writings,
  categories,
  routing
});

export default rootReducer;
