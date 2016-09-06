import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Navigation from '../commons/Navigation'

import { fetchSession } from '../../actions/session'

class App extends Component {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(fetchSession())
  }

  render () {
    return (
      <div>
        <div className='container'>
          <div className='col-md-offset-1 col-md-10'>
            <Navigation />
            <h1><a href='/'>weblog ricale st.</a></h1>
          </div>
        </div>
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
