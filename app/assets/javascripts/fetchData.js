import fetch from 'isomorphic-fetch'

function serialize (object, prefix) {
  var strings = [];

  for(var key in object) {
    if(object.hasOwnProperty(key) && object[key]) {
      strings.push(`${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`)
    }
  }

  return strings.join("&")
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response

  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON (response) {
  return response.json()
}

export function fetchData (url, beforeCallback, successCallback, failureCallback, options = {}) {
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
      var serializedParams = serialize(params)
      if(serializedParams.length > 0) {
        url += `?${serializedParams}`
      }
    }
  }

  return dispatch => {
    dispatch(beforeCallback())

    return (
      fetch(url, requestOptions).
      then(checkStatus).
      then(parseJSON).
      then(json => dispatch(successCallback(json))).
      catch(error => {
        return error.response.json().
                              then(json => dispatch(failureCallback(json.message)))
      })
    )
  }
}