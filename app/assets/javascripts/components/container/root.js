import React, { Component } from 'react'
// import { render } from 'react-dom'
import { Provider } from 'react-redux'
import routes from '../../routes'
import { Router, browserHistory } from 'react-router'

export default class Root extends Component {
  render() {
    const { store, history } = this.props
    return <Router history={browserHistory} routes={routes} />
  }
}
