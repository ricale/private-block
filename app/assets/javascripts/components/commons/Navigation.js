import React, { Component } from 'react'

import LogoutButton from './LogoutButton';

export default class Navigation extends Component {
  render () {
    const { session } = this.props

    return (
      <nav className='navigation'>
        <span className='navigation__item'><a href='/writings'>Writings</a></span>

        {session.valid &&
          <span className='navigation__logged_in_items'>
            <span className='navigation__item'><a href='/writings/new'>New Writing</a></span>
            |
            <span className='navigation__item'><a href='/categories'>Categories</a></span>
            <span className='navigation__item'><a href='/categories/new'>New Category</a></span>
            |
            <span className='navigation__item'><LogoutButton session={session}/></span>
          </span>
        }

        {!session.valid &&
          <span className='navigation__item navigation__item_hide'><a href='/users/sign_in'>Sign In</a></span>
        }
      </nav>
    )
  }
}
