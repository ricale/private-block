import { fetchData } from '../fetchData'

import {
  FETCH_WRITING_LIST_REQUEST, FETCH_WRITING_LIST_SUCCESS, FETCH_WRITING_LIST_FAILURE,
  FETCH_WRITING_REQUEST,      FETCH_WRITING_SUCCESS,      FETCH_WRITING_FAILURE,
  CREATE_WRITING_REQUEST,     CREATE_WRITING_SUCCESS,     CREATE_WRITING_FAILURE,
  UPDATE_WRITING_REQUEST,     UPDATE_WRITING_SUCCESS,     UPDATE_WRITING_FAILURE,
  DELETE_WRITING_REQUEST,     DELETE_WRITING_SUCCESS,     DELETE_WRITING_FAILURE
} from '../constants/ActionType'

function generateRequestActionCreator (type) {
  return () => {
    return {
      type
    }
  }
}

function generateSuccessActionCreator (type) {
  return data => {
    const { writings, categories } = data

    return {
      type,
      writings,
      categories
    }
  }
}

function generateFailureActionCreator (type) {
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

function fetchWritingData(url, states, options) {
  return fetchData(
    url,
    generateRequestActionCreator(states[0]),
    generateSuccessActionCreator(states[1]),
    generateFailureActionCreator(states[2]),
    options
  )
}



export function fetchWritings (categoryId = undefined, params = {}, successCallback = undefined, failureCallback = undefined) {
  const url = categoryId ? `/categories/${categoryId}/writings.json` : '/writings.json'

  return fetchWritingData(
    url,
    [
      FETCH_WRITING_LIST_REQUEST,
      FETCH_WRITING_LIST_SUCCESS,
      FETCH_WRITING_LIST_FAILURE,
    ],
    {
      params,
      successCallback,
      failureCallback
    }
  )
}

export function fetchWriting (id, options = {}, successCallback = undefined, failureCallback = undefined) {
  let url
  if(id) {
    url = options.withCategories ? `/writings/${id}/edit.json` : `/writings/${id}.json`

  } else {
    url = '/writings/new.json'
  }

  return fetchWritingData(
    url,
    [
      FETCH_WRITING_REQUEST,
      FETCH_WRITING_SUCCESS,
      FETCH_WRITING_FAILURE,
    ],
    {
      successCallback,
      failureCallback,
    }
  )
}

export function createWriting (params, successCallback = undefined, failureCallback = undefined) {
  return fetchWritingData(
    '/writings',
    [
      CREATE_WRITING_REQUEST,
      CREATE_WRITING_SUCCESS,
      CREATE_WRITING_FAILURE,
    ],
    {
      method: 'POST',
      params,
      successCallback,
      failureCallback
    }
  )
}

export function updateWriting (params, successCallback = undefined, failureCallback = undefined) {
  return fetchWritingData(
    `/writings/${params.writing.id}.json`,
    [
      UPDATE_WRITING_REQUEST,
      UPDATE_WRITING_SUCCESS,
      UPDATE_WRITING_FAILURE,
    ],
    {
      method: 'PUT',
      params,
      successCallback,
      failureCallback
    }
  )
}

export function deleteWriting (id, authenticityToken, successCallback = undefined, failureCallback = undefined) {
  return fetchWritingData(
    `/writings/${id}.json`,
    [
      DELETE_WRITING_REQUEST,
      DELETE_WRITING_SUCCESS,
      DELETE_WRITING_FAILURE,
    ],
    {
      method: 'DELETE',
      params: {
        authenticity_token: authenticityToken
      },
      successCallback,
      failureCallback
    }
  )
}
