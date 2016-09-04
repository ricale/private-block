import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router';

import {
  FETCH_WRITING_LIST_REQUEST,
  FETCH_WRITING_LIST_SUCCESS,
  FETCH_WRITING_LIST_FAILURE,
  FETCH_WRITING_REQUEST,
  FETCH_WRITING_SUCCESS,
  FETCH_WRITING_FAILURE,
  CREATE_WRITING_REQUEST,
  CREATE_WRITING_SUCCESS,
  CREATE_WRITING_FAILURE
} from '../constants/ActionType'

function fetchData (url, beforeCallback, successCallback, options = {}) {
  const { parameters, method } = options

  var requestOptions = {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  if(parameters) {
    requestOptions.body = JSON.stringify(parameters)
  }

  if(method) {
    requestOptions.method = method
  }

  return dispatch => {
    dispatch(beforeCallback())

    return (
      fetch(url, requestOptions).
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
  return fetchData(
    '/writings.json',
    requestWritings,
    succeedRequestingWritings
  )
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

function requestCreatingWriting () {
  return {
    type: CREATE_WRITING_REQUEST
  }
}

function succeedRequestingCreatingWriting (data) {
  const { writing } = data

  // browserHistory.push('/writing/')

  return {
    type: CREATE_WRITING_SUCCESS,
    writings: {
      selected: writing
    }
  }
}

export function createWriting (data) {
  return fetchData(
    '/writings',
    requestCreatingWriting,
    succeedRequestingCreatingWriting,
    {
      parameters: data,
      method: 'POST'
    }
  )
}
