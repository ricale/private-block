import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from '../commons/Header'
import Sidebar from '../commons/Sidebar'
import Footer from '../commons/Footer'

import { fetchSession, signOut } from '../../actions/session'

export default class App extends Component {
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
