import React, {Component} from 'react';

import Form from './Form';

export default class LogoutButton extends Component {
  static defaultProps = {
    style: {
      background: 'none',
      border: 0
    }
  };

  render () {
    const {session, style} = this.props;

    return (
      <Form action="/users/sign_out" method="DELETE" token={session.authenticityToken}>
        <input type="submit" value="Sign out" style={style}/>
      </Form>
    )
  }
}
