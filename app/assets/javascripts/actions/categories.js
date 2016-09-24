import { browserHistory } from 'react-router'

import { fetchData } from '../fetchData'

import {
  FETCH_CATEGORY_LIST_REQUEST, FETCH_CATEGORY_LIST_SUCCESS, FETCH_CATEGORY_LIST_FAILURE,
  FETCH_CATEGORY_REQUEST,      FETCH_CATEGORY_SUCCESS,      FETCH_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST,     CREATE_CATEGORY_SUCCESS,     CREATE_CATEGORY_FAILURE,
  UPDATE_CATEGORY_REQUEST,     UPDATE_CATEGORY_SUCCESS,     UPDATE_CATEGORY_FAILURE
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



function succeedRequestingCategories (data) {
  const { categories } = data

  return {
    type: FETCH_CATEGORY_LIST_SUCCESS,
    categories
  }
}

export function fetchCategories () {
  const url = '/categories.json'

  return fetchData(
    url,
    generateRequestCallback(FETCH_CATEGORY_LIST_REQUEST),
    succeedRequestingCategories,
    generateFailureCallback(FETCH_CATEGORY_LIST_FAILURE)
  )
}

function succeedRequestingCategory (data) {
  const { categories } = data

  return {
    type: FETCH_CATEGORY_SUCCESS,
    categories
  }
}

export function fetchCategory (id) {
  const url = id ? `/categories/${id}/edit.json` : '/categories/new.json'

  return fetchData(
    url,
    generateRequestCallback(FETCH_CATEGORY_REQUEST),
    succeedRequestingCategory,
    generateFailureCallback(FETCH_CATEGORY_FAILURE)
  )
}

function succeedRequestingCreatingCategory (data) {
  const { categories } = data

  return {
    type: CREATE_CATEGORY_SUCCESS,
    categories
  }
}

export function createCategory (data) {
  return fetchData(
    '/categories.json',
    generateRequestCallback(CREATE_CATEGORY_REQUEST),
    succeedRequestingCreatingCategory,
    generateFailureCallback(CREATE_CATEGORY_FAILURE),
    {
      params: data,
      method: 'POST'
    }
  )
}

function succeedRequestingUpdatingCategory (data) {
  const { categories } = data

  return {
    type: UPDATE_CATEGORY_SUCCESS,
    categories
  }
}

export function updateCategory (data) {
  return fetchData(
    `/categories/${data.category.id}.json`,
    generateRequestCallback(UPDATE_CATEGORY_REQUEST),
    succeedRequestingUpdatingCategory,
    generateFailureCallback(UPDATE_CATEGORY_FAILURE),
    {
      params: data,
      method: 'PUT'
    }
  )
}
