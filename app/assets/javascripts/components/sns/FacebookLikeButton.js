import React, { Component } from 'react'

export default class FacebookComments extends Component {
  render () {
    const { href } = this.props

    return (
      <div className="fb-like" data-href={href} data-layout="standard" data-action="like" data-size="small" data-show-faces="true" data-share="true"></div>
    )
  }
}
