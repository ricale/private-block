import React, { Component } from 'react'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from '../../store/configureStore'

import { Provider } from 'react-redux'
import routes from '../../routes'

export default class Root extends Component {
  render() {
    const { session, writings, categories } = this.props

    const store = configureStore({
      session,
      writings,
      categories
    })
    const history = syncHistoryWithStore(browserHistory, store)

    return (
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    )
  }
}
