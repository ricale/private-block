import { browserHistory } from 'react-router';

import { fetchData } from '../fetchData'

import {
  FETCH_CATEGORY_LIST_REQUEST, FETCH_CATEGORY_LIST_SUCCESS, FETCH_CATEGORY_LIST_FAILURE,
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

export function fetchWritings () {
  const url = '/categories.json'

  return fetchData(
    url,
    generateRequestCallback(FETCH_CATEGORY_LIST_REQUEST),
    succeedRequestingCategories,
    generateFailureCallback(FETCH_CATEGORY_LIST_FAILURE)
  )
}