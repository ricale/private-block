import React, {Component} from 'react';

import App from '../components/containers/App';
import SignInForm from '../components/users/SignInForm';

export default class WritingPage extends Component {
  render () {
    return (
      <App {...this.props}>
        <SignInForm {...this.props}/>
      </App>
    )
  }
}
