import fetch from 'isomorphic-fetch'

import {
  FETCH_WRITING_LIST_REQUEST,
  FETCH_WRITING_LIST_SUCCESS,
  FETCH_WRITING_LIST_FAILURE,
  FETCH_NEW_WRITING_REQUEST,
  FETCH_NEW_WRITING_SUCCESS,
  FETCH_NEW_WRITING_FAILURE,
  FETCH_WRITING_REQUEST,
  FETCH_WRITING_SUCCESS,
  FETCH_WRITING_FAILURE,
} from '../constants/ActionType'

function fetchData (url, beforeCallback, successCallback) {
  return dispatch => {
    dispatch(beforeCallback())

    return (
      fetch(url, {
        credentials: 'same-origin',
      }).
      then(response => response.json()).
      then(json => dispatch(successCallback(json)))
    )
  }
}



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

    return (
      fetch('/writings.json', {
        credentials: 'same-origin',
      }).
      then(response => response.json()).
      then(json => dispatch(succeedRequestingWritings(json)))
    )
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

    return (
      fetch('/writings/new.json', {
        credentials: 'same-origin',
      }).
      then(response => response.json()).
      then(json => dispatch(succeedRequestingNewWriting(json)))
    )
  }
}

function requestWriting () {
  return {
    type: FETCH_WRITING_REQUEST
  }
}

function succeedRequestingWriting (data) {
  const { writing } = data
  return {
    type: FETCH_WRITING_SUCCESS,
    writings: {
      selected: writing
    }
  }
}

export function fetchWriting (id) {
  return fetchData(
    `/writings/${id}.json`,
    requestWriting,
    succeedRequestingWriting
  )
}
