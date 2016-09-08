import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Navigation from '../commons/Navigation'
import Messages from '../commons/Messages'

import { fetchSession, signOut } from '../../actions/session'

class App extends Component {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(fetchSession())
  }

  onClickSignOut (event) {
    event.preventDefault()

    const { dispatch, session } = this.props

    dispatch(signOut(session.authenticityToken))
  }

  render () {
    const { messages, children, session } = this.props
    return (
      <div>
        <div className='container'>
          <div className='col-md-offset-1 col-md-10'>
            <Navigation loggedInNow={session.valid}
                        onClickSignOut={this.onClickSignOut.bind(this)}/>
            <Messages messages={messages}/>
            <h1><Link to='/'>weblog ricale st.</Link></h1>
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
