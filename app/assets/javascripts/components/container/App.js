import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Navigation from '../commons/Navigation'

import { fetchSession } from '../../actions'

class App extends Component {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(fetchSession())
  }

  render () {
    return (
      <div>
        <Navigation />
        <h1>Home1</h1>
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return state
}

export default connect(mapStateToProps)(App)
// export default App
