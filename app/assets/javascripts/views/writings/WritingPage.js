import React, {Component} from 'react';

import App from '../../components/containers/App';
import WritingItem from '../../components/writings/WritingItem';

export default class WritingPage extends Component {
  render () {
    return (
      <App {...this.props}>
        <WritingItem {...this.props}/>
      </App>
    )
  }
}
