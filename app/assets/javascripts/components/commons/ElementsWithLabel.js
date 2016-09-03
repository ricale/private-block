import React, { Component } from 'react'

export default class ElementsWithLabel extends Component {
  render () {
    const { id, labelText, children } = this.props

    return (
      <div className='elements-with-label form-group'>
        <label htmlFor={id} className='elements-with-label__label col-lg-2 control-label'>
          {labelText}
        </label>
        <div className='elements-with-label__elements-container col-lg-10'>
          {children}
        </div>
      </div>
    )
  }
}
