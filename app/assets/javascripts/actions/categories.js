import { fetchData } from '../fetchData'

import { browserHistory } from 'react-router'

import {
  FETCH_CATEGORY_LIST_REQUEST, FETCH_CATEGORY_LIST_SUCCESS, FETCH_CATEGORY_LIST_FAILURE,
  FETCH_CATEGORY_REQUEST,      FETCH_CATEGORY_SUCCESS,      FETCH_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST,     CREATE_CATEGORY_SUCCESS,     CREATE_CATEGORY_FAILURE,
  UPDATE_CATEGORY_REQUEST,     UPDATE_CATEGORY_SUCCESS,     UPDATE_CATEGORY_FAILURE
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
    const { categories } = data

    return {
      type,
      categories
    }
  }
}

function generateFailureActionCreator (type) {
  return (errorMessage) => {
    return {
      type,
      message: {
        type: 'error',
        message: errorMessage
      }
    }
  }
}

function failureCallbackForUnauthorized (error) {
  switch(error.response.status) {
  case 401:
    browserHistory.push('/users/sign_in')
    break;
  }
}

function fetchCategoryData (url, states, options = {}) {
  if(typeof(options.failureCallback) === 'function') {
    const originalFailureCallback = options.failureCallback
    options.failureCallback = function (error) {
      originalFailureCallback(error)
      failureCallbackForUnauthorized(error)
    }

  } else {
    options.failureCallback = failureCallbackForUnauthorized
  }

  return fetchData(
    url,
    generateRequestActionCreator(states[0]),
    generateSuccessActionCreator(states[1]),
    generateFailureActionCreator(states[2]),
    options
  )
}


export function fetchCategories (successCallback = undefined, failureCallback = undefined) {
  return fetchCategoryData(
    '/categories.json',
    [
      FETCH_CATEGORY_LIST_REQUEST,
      FETCH_CATEGORY_LIST_SUCCESS,
      FETCH_CATEGORY_LIST_FAILURE
    ],
    {
      successCallback,
      failureCallback
    }
  )
}

export function fetchCategory (id, successCallback = undefined, failureCallback = undefined) {
  const url = id ? `/categories/${id}/edit.json` : '/categories/new.json'

  return fetchCategoryData(
    url,
    [
      FETCH_CATEGORY_REQUEST,
      FETCH_CATEGORY_SUCCESS,
      FETCH_CATEGORY_FAILURE
    ],
    {
      successCallback,
      failureCallback
    }
  )
}

export function createCategory (params, successCallback = undefined, failureCallback = undefined) {
  return fetchCategoryData(
    '/categories.json',
    [
      CREATE_CATEGORY_REQUEST,
      CREATE_CATEGORY_SUCCESS,
      CREATE_CATEGORY_FAILURE
    ],
    {
      method: 'POST',
      params,
      successCallback,
      failureCallback
    }
  )
}

export function updateCategory (params, successCallback = undefined, failureCallback = undefined) {
  return fetchCategoryData(
    `/categories/${params.category.id}.json`,
    [
      UPDATE_CATEGORY_REQUEST,
      UPDATE_CATEGORY_SUCCESS,
      UPDATE_CATEGORY_FAILURE
    ],
    {
      method: 'PUT',
      params,
      successCallback,
      failureCallback
    }
  )
}
