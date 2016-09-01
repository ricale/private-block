import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux';
import {
  FETCH_WRITING_LIST_SUCCESS
} from '../constants/ActionType'

function writings (state = [], action) {
  switch (action.type) {
  case FETCH_WRITING_LIST_SUCCESS:
    return action.writings
  default:
    return state
  }
}

const rootReducer = combineReducers({
  writings,
  routing
});

export default rootReducer;
