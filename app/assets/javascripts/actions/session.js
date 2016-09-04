import fetch from 'isomorphic-fetch'

import {
  FETCH_SESSION_REQUEST,
  FETCH_SESSION_SUCCESS,
  FETCH_SIGN_IN_REQUEST,
  FETCH_SIGN_IN_SUCCESS
} from '../constants/ActionType'

function requestSession() {
  return {
    type: FETCH_SESSION_REQUEST
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
  return dispatch => {
    dispatch(requestSession())

    return (
      fetch('/auth/is_signed_in.json', {
        credentials: 'same-origin',
      }).
      then(response => response.json()).
      then(json => dispatch(succeedRequestingSession(json)))
    )
  }
}

function requestSignIn() {
  return {
    type: FETCH_SIGN_IN_REQUEST
  }
}

function succeedRequestingSignIn (data) {
  return {
    type: FETCH_SIGN_IN_SUCCESS,
    session: {
      valid: true,
      user:  data
    }
  }
}

export function signIn (email, password, authenticityToken) {
  const parameters = {
    'user': {
      email: email,
      password: password,
    },
    authenticity_token: authenticityToken
  }

  return dispatch => {
    dispatch(requestSignIn())

    return (
      fetch('/users/sign_in.json', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parameters)
      }).
      then(response => response.json()).
      then(json => dispatch(succeedRequestingSignIn(json)))
    )
  }
}
