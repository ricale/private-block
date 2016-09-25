import React, { Component } from 'react'

import connectSubmitForm from '../../connectSubmitForm'

import InputWithLabel from '../commons/InputWithLabel'
import ElementsWithLabel from '../commons/ElementsWithLabel'

import redirectSubmitted from '../../decorators/redirectSubmitted'

@redirectSubmitted('/')
class SignInForm extends Component {
  state = {
    user: {
      email: '',
      password: ''
    }
  }

  onEmailChange (event) {
    this.setState({email: event.target.value})
  }

  onPasswordChange (event) {
    this.setState({password: event.target.value})
  }

  onSubmit (event) {
    event.preventDefault()
    const { onSubmit, session: { authenticityToken } } = this.props
    const { email, password } = this.state

    onSubmit(email, password, authenticityToken)
  }

  render () {
    return (
      <form className='form-horizontal' onSubmit={this.onSubmit.bind(this)}>
        <InputWithLabel id='email'
                        name='email'
                        value={this.state.email}
                        placeholder='email'
                        labelText='email'
                        typeAttribute='email'
                        onChange={this.onEmailChange.bind(this)} />

        <InputWithLabel id='password'
                        name='password'
                        value={this.state.password}
                        placeholder='password'
                        labelText='password'
                        typeAttribute='password'
                        onChange={this.onPasswordChange.bind(this)} />

        <ElementsWithLabel>
          <input id='submit' type='submit' value='submit'/>
        </ElementsWithLabel>
      </form>
    )
  }
}

export default connectSubmitForm(SignInForm)
