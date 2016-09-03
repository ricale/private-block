import React, { Component } from 'react'
import { connect } from 'react-redux'

import InputWithLabel from '../commons/InputWithLabel'
import ElementsWithLabel from '../commons/ElementsWithLabel'

import { signIn } from '../../actions'

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

    const { dispatch, session } = this.props
    const { email, password } = this.state

    dispatch(signIn(email, password, session.authenticityToken))
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

function mapStateToProps (state, ownProps) {
  return state
}

export default connect(mapStateToProps)(SignInForm)
