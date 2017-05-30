import React, {Component} from 'react';

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
      <form action="/users/sign_out" method="POST">
        <input type="hidden" name="_method" value="delete"/>
        <input type="hidden" name="authenticity_token" value={session.authenticityToken}/>
        <input type="submit" value="Sign out" style={style}/>
      </form>
    )
  }
}
