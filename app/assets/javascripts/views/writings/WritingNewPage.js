import React, {Component} from 'react';

import App from '../../components/containers/App';
import WritingForm from '../../components/writings/WritingForm';

export default class WritingPage extends Component {
  render () {
    return (
      <App {...this.props}>
        <WritingForm {...this.props}/>
      </App>
    )
  }
}
