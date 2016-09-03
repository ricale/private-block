import React, { Component } from 'react'

export default class RailsForm extends Component {
  static defaultProps = {
    className: ''
  }

  getHtmlFormMethod () {
    if(this.props.method.toUpperCase() === 'GET') {
      return 'get'
    } else {
      return 'post'
    }
  }

  render () {
    const { className, action, method, children } = this.props

    return (
      <form className={`rails-form ${className}`}
            action={action}
            method={this.getHtmlFormMethod()}>
        <div>
          <input type='hidden' name='authenticity_token' value='authenticity_token' />
          <input type='hidden' name='_method' value={method} />
          <input type='hidden' name='utf8' value='✓' />
        </div>

        {children}

      </form>
    )
  }
}
