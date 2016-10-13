import React, { Component } from 'react'
import { connect } from 'react-redux'

import MyHelmet from '../commons/MyHelmet'
import Header from '../commons/Header'
import Sidebar from '../commons/Sidebar'
import Footer from '../commons/Footer'

import { fetchSession, signOut } from '../../actions/session'

import { CONTAINER_CLASS } from '../../constants/commons'

class App extends Component {
  componentDidMount () {
    const { dispatch } = this.props
  }

  onClickSignOut (event) {
    event.preventDefault()

    const { dispatch, session } = this.props

    dispatch(signOut(session.authenticityToken))
  }

  render () {
    const { children, messages, session, categories } = this.props
    return (
      <div>
        <MyHelmet initialPath={session.initialPath}/>
        <Header className='weblog-header'
                messages={messages}
                session={session}
                onClickSignOut={this.onClickSignOut.bind(this)} />

        <Sidebar className='weblog-sidebar'
                 categories={categories} />

        <div className='weblog-body'>
          {children}
        </div>

        <Footer className='weblog-footer' />
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return state
}

export default connect(mapStateToProps)(App)
// export default App
