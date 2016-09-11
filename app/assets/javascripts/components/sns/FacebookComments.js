import React, { Component } from 'react'

export default class FacebookComments extends Component {
  render () {
    const { href } = this.props

    return (
      <div className='fb-comments' data-width='100%' data-href={href} data-numposts="5"></div>
    )
  }
}