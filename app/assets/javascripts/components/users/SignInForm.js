import React, { Component } from 'react'

import Form from '../commons/Form'
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

    this.onEmailChange = this.onEmailChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
  }

  onEmailChange (event) {
    this.setState({email: event.target.value})
  }

  onPasswordChange (event) {
    this.setState({password: event.target.value})
  }

  render () {
    const {authenticityToken} = this.props;
    const {email, password} = this.state;

    return (
      <Form className='form-horizontal' action="/users/sign_in" method="POST" token={authenticityToken}>
        <InputWithLabel id='email'
                        name='user[email]'
                        value={email}
                        placeholder='email'
                        labelText='email'
                        typeAttribute='email'
                        onChange={this.onEmailChange} />

        <InputWithLabel id='password'
                        name='user[password]'
                        value={password}
                        placeholder='password'
                        labelText='password'
                        typeAttribute='password'
                        onChange={this.onPasswordChange} />

        <ElementsWithLabel>
          <input id='submit' type='submit' value='submit'/>
        </ElementsWithLabel>
      </Form>
    )
  }
}
