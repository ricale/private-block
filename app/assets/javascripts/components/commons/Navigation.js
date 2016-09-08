import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Navigation extends Component {
  render () {
    const { loggedInNow, onClickSignOut } = this.props

    return (
      <nav className='navigation'>
        {loggedInNow &&
          <span className='navigation__item'><a href='#' onClick={onClickSignOut}>Sign Out</a></span>
        }

        <span className='navigation__item'><Link to='/writings'>Writings</Link></span>

        {loggedInNow &&
          <span className='navigation__item'><Link to='/writings/new'>New Writing</Link></span>
        }

        {!loggedInNow &&
          <span className='navigation__item_hide'><Link to='/users/sign_in'>Sign In</Link></span>
        }
      </nav>
    )
  }
}
