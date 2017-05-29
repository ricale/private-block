import React, { Component } from 'react'

import Navigation from '../commons/Navigation'
import Messages from '../commons/Messages'

export default class Header extends Component {
  render () {
    const { className, messages, session, onClickSignOut } = this.props

    return (
      <div className={`header ${className || ''}`}>
        <Messages messages={messages}/>
        <h1><a href='/'>weblog ricale st.</a></h1>
        <Navigation loggedInNow={session.valid}
                    onClickSignOut={onClickSignOut}/>
      </div>
    )
  }
}