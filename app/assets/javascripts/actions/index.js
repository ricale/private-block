import fetch from 'isomorphic-fetch'

import {
  FETCH_WRITING_LIST_REQUEST,
  FETCH_WRITING_LIST_SUCCESS,
  FETCH_WRITING_LIST_FAILURE,
  FETCH_NEW_WRITING_REQUEST,
  FETCH_NEW_WRITING_SUCCESS,
  FETCH_NEW_WRITING_FAILURE
} from '../constants/ActionType'

function requestWritings () {
  return {
    type: FETCH_WRITING_LIST_REQUEST
  }
}

function succeedRequestingWritings (data) {
  const { writings } = data

  return {
    type: FETCH_WRITING_LIST_SUCCESS,
    writings: {
      list: writings
    }
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

function requestNewWriting() {
  return {
    type: FETCH_NEW_WRITING_REQUEST
  }
}

function succeedRequestingNewWriting (data) {
  const { newWriting, categories } = data
  return {
    type: FETCH_NEW_WRITING_SUCCESS,
    writings: {
      new: newWriting,
    },
    categories: {
      list: categories
    }
  }
}

export function fetchNewWriting () {
  return dispatch => {
    dispatch(requestNewWriting())

    return fetch('/writings/new.json').
           then(response => response.json()).
           then(json => dispatch(succeedRequestingNewWriting(json)))
  }
}
