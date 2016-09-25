import React from 'react'
import { bindActionCreators } from 'redux'

export default function connectSubmitForm (Form) {
  return React.createClass({
    getInitialState () {
      return {}
    },

    onSubmit (...args) {
      const { context: { store: dispatch }, props: { submit } } = this

      submit(...args, () => this.setState({ submitted: true }))
    },

    render () {
      const { onSubmit, props, state: { submitted, error} } = this

      return (
        <Form {...props} onSubmit={onSubmit} submitted={submitted} error={error} />
      )
    }
  })
}
