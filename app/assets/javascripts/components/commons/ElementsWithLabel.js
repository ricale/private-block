import React, { Component } from 'react'

export default class ElementsWithLabel extends Component {
  render () {
    const { id, labelText, children } = this.props

    return (
      <div className='elements-with-label'>
        <label htmlFor={id} className='elements-with-label__label'>
          {labelText}
        </label>
        <div className='elements-with-label__elements-container'>
          {children}
        </div>
      </div>
    )
  }
}
