import React, { Component } from 'react'

import { connect } from 'react-redux'
import { signIn } from '../../actions/session'

import SignInForm from '../users/SignInForm'

class SessionPage extends Component {
  static defaultProps = {
    session: {
      user: undefined,
      valid: false
    }
  }

  componentDidMount () {

  }

  onLogin (email, password) {
    const { dispatch, session } = this.props

    dispatch(signIn(email, password, session.authenticityToken))
  }

  childrenProps (type) {
    const { session } = this.props

    switch (type) {
    case SignInForm:
      return {
        session,
        onLogin: this.onLogin.bind(this)
      }
    }
  }

  render () {
    const { children } = this.props

    const childrenWithProps = React.Children.map(children, (child) =>
      React.cloneElement(child, this.childrenProps(child.type))
    )

    return (
      <div className='container'>
        <div className='col-md-offset-1 col-md-10'>
          <div className='writing-page'>
            {childrenWithProps}
          </div>
        </div>
      </div>
    )
  }
}


function mapStateToProps (state, ownProps) {
  return {
    session: state.session
  }
}

export default connect(mapStateToProps)(SessionPage)
