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




function succeedRequestingSession (data) {
  const { signed_in, user } = data
  return {
    type: FETCH_SESSION_SUCCESS,
    session: {
      valid: signed_in,
      user: user
    }
  }
}

export function fetchSession () {
  return fetchData(
    '/auth/is_signed_in.json',
    generateRequestCallback(FETCH_SESSION_REQUEST),
    succeedRequestingSession,
    generateFailureCallback(FETCH_SESSION_FAILURE)
  )
}

function succeedRequestingSignIn (data) {
  browserHistory.push(`/`)

  return {
    type: CREATE_SESSION_SUCCESS,
    session: {
      valid: true,
      user:  data.user,
      authenticityToken: data.authenticity_token
    }
  }
}

export function signIn (email, password, authenticityToken) {
  const params = {
    'user': {
      email: email,
      password: password,
    },
    authenticity_token: authenticityToken
  }

  return fetchData(
    '/users/sign_in.json',
    generateRequestCallback(CREATE_SESSION_REQUEST),
    succeedRequestingSignIn,
    generateFailureCallback(CREATE_SESSION_FAILURE),
    {
      method: 'POST',
      params,
    }
  )
}

function succeedRequestingSignOut (data) {
  browserHistory.push(`/`)

  return {
    type: DELETE_SESSION_SUCCESS,
    session: {
      valid: false,
      user:  {},
      authenticityToken: data.authenticity_token
    }
  }
}

export function signOut (authenticityToken) {
  const params = {
    authenticity_token: authenticityToken
  }

  return fetchData(
    '/users/sign_out.json',
    generateRequestCallback(DELETE_SESSION_REQUEST),
    succeedRequestingSignOut,
    generateFailureCallback(DELETE_SESSION_FAILURE),
    {
      method: 'DELETE',
      params,
    }
  )
}
