import fetch from 'isomorphic-fetch'

import {
  FETCH_WRITING_LIST_REQUEST,
  FETCH_WRITING_LIST_SUCCESS,
  FETCH_WRITING_LIST_FAILURE
} from '../constants/ActionType'

function requestWritings () {
  return {
    type: FETCH_WRITING_LIST_REQUEST
  }
}

function succeedRequestingWritings (writings) {
  return {
    type: FETCH_WRITING_LIST_SUCCESS,
    writings
  }
}

export function fetchWritings () {
  return dispatch => {
    dispatch(requestWritings())

    return fetch('/writings.json').
           then(response => response.json()).
           then(json => dispatch(succeedRequestingWritings(json)))
  }
}
