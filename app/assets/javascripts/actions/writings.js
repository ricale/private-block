import { browserHistory } from 'react-router';

import { fetchData } from '../fetchData'

import {
  FETCH_WRITING_LIST_REQUEST, FETCH_WRITING_LIST_SUCCESS, FETCH_WRITING_LIST_FAILURE,
  FETCH_WRITING_REQUEST,      FETCH_WRITING_SUCCESS,      FETCH_WRITING_FAILURE,
  CREATE_WRITING_REQUEST,     CREATE_WRITING_SUCCESS,     CREATE_WRITING_FAILURE,
  UPDATE_WRITING_REQUEST,     UPDATE_WRITING_SUCCESS,     UPDATE_WRITING_FAILURE,
  DELETE_WRITING_REQUEST,     DELETE_WRITING_SUCCESS,     DELETE_WRITING_FAILURE
} from '../constants/ActionType'

function generateRequestCallback (type) {
  return () => {
    return {
      type: type
    }
  }
}

function generateFailureCallback (type) {
  return (errorMessage) => {
    return {
      type: type,
      message: {
        type: 'error',
        message: errorMessage
      }
    }
  }
}



function succeedRequestingWritings (data) {
  const { writings } = data

  return {
    type: FETCH_WRITING_LIST_SUCCESS,
    writings
  }
}

export function fetchWritings (categoryId = undefined, data = {}) {
  let url;
  if(categoryId) {
    url = `/categories/${categoryId}/writings.json`
  } else {
    url = '/writings.json'
  }

  return fetchData(
    url,
    generateRequestCallback(FETCH_WRITING_LIST_REQUEST),
    succeedRequestingWritings,
    generateFailureCallback(FETCH_WRITING_LIST_FAILURE),
    {
      params: data
    }
  )
}

function succeedRequestingWriting (data) {
  const { writings, categories } = data

  let result = {
    type: FETCH_WRITING_SUCCESS,
    writings
  }

  if(categories) {
    result.categories = categories
  }

  return result
}

export function fetchWriting (id, options = {}) {
  let url
  if(id) {
    url = options.withCategories ? `/writings/${id}/edit.json` : `/writings/${id}.json`

  } else {
    url = '/writings/new.json'
  }

  return fetchData(
    url,
    generateRequestCallback(FETCH_WRITING_REQUEST),
    succeedRequestingWriting,
    generateFailureCallback(FETCH_WRITING_FAILURE)
  )
}

function succeedRequestingCreatingWriting (data) {
  const { writings } = data

  browserHistory.push(`/${writings.selected.id}`)

  return {
    type: CREATE_WRITING_SUCCESS,
    writings
  }
}

export function createWriting (data) {
  return fetchData(
    '/writings',
    generateRequestCallback(CREATE_WRITING_REQUEST),
    succeedRequestingCreatingWriting,
    generateFailureCallback(CREATE_WRITING_FAILURE),
    {
      params: data,
      method: 'POST'
    }
  )
}

function succeedRequestingUpdatingWriting (data) {
  const { writings } = data

  browserHistory.push(`/${writings.selected.id}`)

  return {
    type: UPDATE_WRITING_SUCCESS,
    writings
  }
}

export function updateWriting (data) {
  const { writing } = data

  return fetchData(
    `/writings/${writing.id}.json`,
    generateRequestCallback(UPDATE_WRITING_REQUEST),
    succeedRequestingUpdatingWriting,
    generateFailureCallback(UPDATE_WRITING_FAILURE),
    {
      params: data,
      method: 'PUT'
    }
  )
}

function succeedRequestingDeletingWriting (data) {
  const { writings } = data

  browserHistory.push('/writings')

  return {
    type: DELETE_WRITING_SUCCESS,
    writings
  }
}

export function deleteWriting (id, authenticityToken) {
  return fetchData(
    `/writings/${id}.json`,
    generateRequestCallback(DELETE_WRITING_REQUEST),
    succeedRequestingDeletingWriting,
    generateFailureCallback(DELETE_WRITING_FAILURE),
    {
      params: {
        authenticity_token: authenticityToken
      },
      method: 'DELETE'
    }
  )
}
