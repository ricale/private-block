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
  CREATE_WRITING_FAILURE,
  UPDATE_WRITING_REQUEST,
  UPDATE_WRITING_SUCCESS,
  UPDATE_WRITING_FAILURE,
  DELETE_WRITING_REQUEST,
  DELETE_WRITING_SUCCESS,
  DELETE_WRITING_FAILURE
} from '../constants/ActionType'

function serialize (object, prefix) {
  var strings = [];

  for(var key in object) {
    if(object.hasOwnProperty(key)) {
      strings.push(`${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`)
    }
  }

  return strings.join("&")
}

function fetchData (url, beforeCallback, successCallback, options = {}) {
  const { params, method } = options

  var requestOptions = {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  if(method) {
    requestOptions.method = method.toUpperCase()
  }

  if(params) {
    if(requestOptions.method && requestOptions.method != 'GET') {
      requestOptions.body = JSON.stringify(params)
    } else {
      url += `?${serialize(params)}`
    }
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
  const { writings, page, total_page } = data

  console.log('data', data)

  return {
    type: FETCH_WRITING_LIST_SUCCESS,
    writings: {
      list: writings,
      page: page,
      totalPage: total_page
    }
  }
}

export function fetchWritings (categoryId = undefined, data = {}) {
  var url;
  if(categoryId) {
    url = `/categories/${categoryId}/writings.json`
  } else {
    url = '/writings.json'
  }

  return fetchData(
    url,
    requestWritings,
    succeedRequestingWritings, {
      params: data
    }
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

  browserHistory.push(`/writings/${writing.id}`)

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
      params: data,
      method: 'POST'
    }
  )
}

function requestUpdatingWriting () {
  return {
    type: UPDATE_WRITING_REQUEST
  }
}

function succeedRequestingUpdatingWriting (data) {
  const { writing } = data

  browserHistory.push(`/writings/${writing.id}`)

  return {
    type: UPDATE_WRITING_SUCCESS,
    writings: {
      selected: writing
    }
  }
}

export function updateWriting (data) {
  const { writing } = data

  return fetchData(
    `/writings/${writing.id}.json`,
    requestUpdatingWriting,
    succeedRequestingUpdatingWriting,
    {
      params: data,
      method: 'PUT'
    }
  )
}

function requestDeletingWriting () {
  return {
    type: DELETE_WRITING_REQUEST
  }
}

function succeedRequestingDeletingWriting (data) {
  const { writing } = data

  browserHistory.push('/writings')

  return {
    type: DELETE_WRITING_SUCCESS,
    writings: {
      selected: undefined
    }
  }
}

export function deleteWriting (id, authenticityToken) {
  return fetchData(
    `/writings/${id}.json`,
    requestDeletingWriting,
    succeedRequestingDeletingWriting,
    {
      params: {
        authenticity_token: authenticityToken
      },
      method: 'DELETE'
    }
  )
}

