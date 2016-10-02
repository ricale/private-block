import React, { Component } from 'react'

export default class InputWithLabel extends Component {
  static defaultProps = {
    elementType: 'input'
  }

  renderInput () {
    const { id, elementType, typeAttribute, inputClassName, placeholder, name, value, onChange, options } = this.props

    const attributes = {
      className: `input-with-label__${elementType} ${inputClassName || ''}`,
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
      <div className='input-with-label'>
        <label htmlFor={id}
               className='input-with-label__label'>
          {labelText}
        </label>

        <div className='input-with-label__input-wrapper'>
          {this.renderInput()}
        </div>
      </div>
    )
  }
}
