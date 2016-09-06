import React, { Component } from 'react'

export default class Messages extends Component {
  static defaultProps = {
    messages: []
  }

  getMessageClassNamePrefix (type) {
    switch (type) {
    case 'error': return 'danger'
    default:      return type
    }
  }

  getMessagePrefix (type) {
    switch (type) {
    case 'success': return 'Success!'
    case 'info':    return 'Notice!'
    case 'warning': return 'Warning!'
    case 'danger':  return 'Error!'
    }
  }

  render () {
    const { messages } = this.props

    return (
      <div className='message'>
        {messages.map((message) => {
          return(
            <div className={`text-${this.getMessageClassNamePrefix(message.type)}`} key=''>
              {this.getMessagePrefix()} {message.message}
            </div>
          )
        })}
      </div>
    )
  }
}
