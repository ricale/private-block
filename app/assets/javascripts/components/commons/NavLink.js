import React, { Component } from 'react'

export default class NavLink extends Component {
  render () {
    return (
      <a {...this.props} activeClassName='active' />
    )
  }
}
