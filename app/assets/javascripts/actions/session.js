import { browserHistory } from 'react-router';

import { fetchData } from '../fetchData'

import {
  FETCH_SESSION_REQUEST,
  FETCH_SESSION_SUCCESS,
  FETCH_SESSION_FAILURE,
  CREATE_SESSION_REQUEST,
  CREATE_SESSION_SUCCESS,
  CREATE_SESSION_FAILURE,
  DELETE_SESSION_SUCCESS,
  DELETE_SESSION_REQUEST,
  DELETE_SESSION_FAILURE
} from '../constants/ActionType'

function generateRequestActionCreator (type) {
  return () => {
    return {
      type: type
    }
  }
}

function generateSuccessActionCreator (type) {
  return data => {
    const { user, authenticity_token } = data

    return {
      type,
      session: {
        valid: !!user,
        user:  (user || {}),
        authenticityToken: authenticity_token
      }
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

function fetchSessionData (url, states, options) {
  return fetchData(
    url,
    generateRequestActionCreator(states[0]),
    generateSuccessActionCreator(states[1]),
    generateFailureActionCreator(states[2]),
    options
  )
}




export function fetchSession (successCallback = undefined, failureCallback = undefined) {
  return fetchSessionData(
    '/auth/is_signed_in.json',
    [
      FETCH_SESSION_REQUEST,
      FETCH_SESSION_SUCCESS,
      FETCH_SESSION_FAILURE
    ],
    {
      successCallback,
      failureCallback
    }
  )
}

export function signIn (email, password, authenticityToken, successCallback = undefined, failureCallback = undefined) {
  return fetchSessionData(
    '/users/sign_in.json',
    [
      CREATE_SESSION_REQUEST,
      CREATE_SESSION_SUCCESS,
      CREATE_SESSION_FAILURE
    ],
    {
      method: 'POST',
      params: {
        user: { email, password },
        authenticity_token: authenticityToken
      },
      successCallback,
      failureCallback
    }
  )
}

export function signOut (authenticityToken, successCallback = undefined, failureCallback = undefined) {
  return fetchSessionData(
    '/users/sign_out.json',
    [
      DELETE_SESSION_REQUEST,
      DELETE_SESSION_SUCCESS,
      DELETE_SESSION_FAILURE
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
