import { browserHistory } from 'react-router';

import { fetchData } from '../fetchData'

import {
  FETCH_CATEGORY_LIST_REQUEST, FETCH_CATEGORY_LIST_SUCCESS, FETCH_CATEGORY_LIST_FAILURE,
  FETCH_CATEGORY_REQUEST,      FETCH_CATEGORY_SUCCESS,      FETCH_CATEGORY_FAILURE,
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