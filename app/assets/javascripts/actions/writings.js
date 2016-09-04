import fetch from 'isomorphic-fetch'

import {
  FETCH_WRITING_LIST_REQUEST,
  FETCH_WRITING_LIST_SUCCESS,
  FETCH_WRITING_LIST_FAILURE,
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

function requestWriting () {
  return {
    type: FETCH_WRITING_REQUEST
  }
}

function succeedRequestingWriting (data) {
  const { writing, categories } = data

  var result = {
    type: FETCH_WRITING_SUCCESS,
    writings: {
      selected: writing
    }
  }

  if(categories) {
    result.categories = {
      list: categories
    }
  }

  return result
}

export function fetchWriting (id, options = {}) {
  var url
  if(id) {
    url = options.withCategories ? `/writings/${id}/edit.json` : `/writings/${id}.json`

  } else {
    url = '/writings/new.json'
  }

  return fetchData(
    url,
    requestWriting,
    succeedRequestingWriting
  )
}
