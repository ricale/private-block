import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from '../commons/Header'
import Footer from '../commons/Footer'

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
    const { children, messages, session } = this.props
    return (
      <div>
        <div className='container'>
          <div className='col-md-offset-1 col-md-10'>
            <Header className='weblog-header'
                    messages={messages}
                    session={session}
                    onClickSignOut={this.onClickSignOut.bind(this)} /> 
          </div>
        </div>

        <div className='weblog-body'>
          {children}
        </div>

        <div className='container'>
          <div className='col-md-offset-1 col-md-10'>
            <Footer className='weblog-footer' />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return state
}

export default connect(mapStateToProps)(App)
// export default App
