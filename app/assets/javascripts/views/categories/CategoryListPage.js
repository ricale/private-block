import React, {Component} from 'react';

import App from '../../components/containers/App';
import CategoryList from '../../components/categories/CategoryList';

export default class WritingPage extends Component {
  render () {
    return (
      <App {...this.props}>
        <CategoryList {...this.props}/>
      </App>
    )
  }
}
