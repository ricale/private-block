import React, { Component } from 'react'

export default class FacebookComments extends Component {
  render () {
    const { href } = this.props

    return (
      <div className="fb-like" data-href={href} data-layout="button_count" data-action="like" data-size="small" data-show-faces="false" data-share="true"></div>
    )
  }
}
