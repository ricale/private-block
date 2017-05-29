import React, { Component } from 'react'

export default class Navigation extends Component {
  render () {
    const { loggedInNow, onClickSignOut } = this.props

    return (
      <nav className='navigation'>
        <span className='navigation__item'><a href='/writings'>Writings</a></span>

        {loggedInNow &&
          <span className='navigation__logged_in_items'>
            <span className='navigation__item'><a href='/writings/new'>New Writing</a></span>
            |
            <span className='navigation__item'><a href='/categories'>Categories</a></span>
            <span className='navigation__item'><a href='/categories/new'>New Category</a></span>
            |
            <span className='navigation__item'><a href='#' onClick={onClickSignOut}>Sign Out</a></span>
          </span>
        }

        {!loggedInNow &&
          <span className='navigation__item navigation__item_hide'><a href='/users/sign_in'>Sign In</a></span>
        }
      </nav>
    )
  }
}
