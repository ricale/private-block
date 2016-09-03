import React, { Component } from 'react'
import { Link } from 'react-router'
import Navigation from '../commons/Navigation'

export default class App extends Component {
  render () {
    return (
      <div>
        <Navigation />
        <h1>Home1</h1>
        {this.props.children}
      </div>
    )
  }
}
