import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Navigation from '../commons/Navigation'
import Messages from '../commons/Messages'

import { fetchSession } from '../../actions/session'

class App extends Component {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(fetchSession())
  }

  render () {
    const { messages, children } = this.props
    return (
      <div>
        <div className='container'>
          <div className='col-md-offset-1 col-md-10'>
            <Navigation />
            <Messages messages={messages}/>
            <h1><a href='/'>weblog ricale st.</a></h1>
          </div>
        </div>
        {children}
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return state
}

export default connect(mapStateToProps)(App)
// export default App
