import React, { Component } from 'react'
import { Link } from 'react-router'

export default class App extends Component {
  render () {
    return (
      <div>
        <h1>Home</h1>
        <Link to='/writings'>Writing</Link>
        {this.props.children}
      </div>
    )
  }
}
