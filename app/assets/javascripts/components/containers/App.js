import React, { Component } from 'react'

import Header from '../commons/Header'
import Sidebar from '../commons/Sidebar'
import Footer from '../commons/Footer'

export default class App extends Component {
  render () {
    const {children, messages, loggedInNow, authenticityToken, categories} = this.props
    
    return (
      <div>
        <Header className='weblog-header'
                messages={messages}
                authenticityToken={authenticityToken}
                loggedInNow={loggedInNow} />

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
