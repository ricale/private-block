import React, {Component} from 'react';

import App from '../../components/containers/App';
import WritingList from '../../components/writings/WritingList';

export default class WritingPage extends Component {
  render () {
    return (
      <App {...this.props}>
        <WritingList {...this.props}/>
      </App>
    )
  }
}
