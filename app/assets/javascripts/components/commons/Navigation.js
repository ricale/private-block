import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Navigation extends Component {
  render () {
    const { authenticityToken } = this.props

    return (
      <ul className='navigation'>
        {/*<li>
          <OneButtonForm authenticityToken={authenticityToken}
                         action='/users/sign_out'
                         method='delete'
                         label='Log Out' />
        </li>*/}
        <li>
          <Link to='/users/sign_in'>Sign In</Link>
        </li>

        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/writings'>Writings</Link>
        </li>
        <li>
          <Link to='/writings/new'>New Writing</Link>
        </li>
      </ul>
    )
  }
}
