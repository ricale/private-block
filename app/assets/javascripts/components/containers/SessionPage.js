import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as SessionActionCreators from '../../actions/session'

import SignInForm from '../users/SignInForm'

import { CONTAINER_CLASS } from '../../constants/commons'

class SessionPage extends Component {
  static defaultProps = {
    session: {
      user: undefined,
      valid: false
    }
  }

  componentDidMount () {

  }

  getChildProps (type) {
    const { session, dispatch } = this.props
    const { signIn } = bindActionCreators(SessionActionCreators, dispatch)

    switch (type) {
    case SignInForm:
      return {
        session,
        submit: signIn
      }
    }
  }

  render () {
    const { children } = this.props

    const childrenWithProps = React.Children.map(children, (child) =>
      React.cloneElement(child, this.getChildProps(child.type))
    )

    return (
      <div className='container'>
        <div className={CONTAINER_CLASS}>
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
