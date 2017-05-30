import React, { Component } from 'react'

import InputWithLabel from '../commons/InputWithLabel'
import ElementsWithLabel from '../commons/ElementsWithLabel'

export default class SignInForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: ''
      }
    };
  }

  onEmailChange (event) {
    this.setState({email: event.target.value})
  }

  onPasswordChange (event) {
    this.setState({password: event.target.value})
  }

  render () {
    const {session} = this.props;
    const {email, password} = this.state;

    return (
      <form className='form-horizontal' action="/users/sign_in" method="POST">
        <input type="hidden" name="authenticity_token" value={session.authenticityToken}/>
        <InputWithLabel id='email'
                        name='user[email]'
                        value={email}
                        placeholder='email'
                        labelText='email'
                        typeAttribute='email'
                        onChange={this.onEmailChange.bind(this)} />

        <InputWithLabel id='password'
                        name='user[password]'
                        value={password}
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
