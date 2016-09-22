import React, { Component } from 'react'

export default class InputWithLabel extends Component {
  static defaultProps = {
    elementType: 'input'
  }

  renderInput () {
    const { id, elementType, typeAttribute, placeholder, name, value, onChange, options } = this.props

    const attributes = {
      className: `input-with-label__${elementType} form-control`,
      placeholder,
      id,
      name,
      value,
      onChange
    }

    switch (elementType) {
    case 'input':
      return <input {...attributes} type={typeAttribute} />

    case 'textarea':
      return <textarea {...attributes}></textarea>

    case 'select':
      return (
        <select {...attributes}>
          {(options || []).map(option =>
            <option value={option.id} key={`option-${option.id}`}>{option.name}</option>
          )}
        </select>
      )
    }
  }

  render () {
    const { id, labelText } = this.props

    return (
      <div className='input-with-label form-group'>
        <label htmlFor={id}
               className='input-with-label__label col-lg-2 control-label'>
          {labelText}
        </label>

        <div className='input-with-label__input-wrapper col-lg-10'>
          {this.renderInput()}
        </div>
      </div>
    )
  }
}
