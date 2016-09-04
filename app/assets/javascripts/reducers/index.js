import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

import {session} from './session'
import {writings} from './writings'
import {categories} from './categories'

const rootReducer = combineReducers({
  session,
  writings,
  categories,
  routing
});

export default rootReducer;
