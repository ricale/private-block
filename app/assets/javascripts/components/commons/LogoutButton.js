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
    const {authenticityToken, style} = this.props;

    return (
      <Form action="/users/sign_out" method="DELETE" token={authenticityToken}>
        <input type="submit" value="Sign out" style={style}/>
      </Form>
    )
  }
}
