import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Navigation extends Component {
  render () {
    return (
      <nav className='navigation'>
        <span className='navigation__item'><Link to='/users/sign_in'>Sign In</Link></span>
        <span className='navigation__item'><Link to='/'>Home</Link></span>
        <span className='navigation__item'><Link to='/writings'>Writings</Link></span>
        <span className='navigation__item'><Link to='/writings/new'>New Writing</Link></span>
      </nav>
    )
  }
}
