import React, {Component} from 'react';

import App from '../../components/containers/App';
import CategoryForm from '../../components/categories/CategoryForm';

export default class WritingPage extends Component {
  render () {
    return (
      <App {...this.props}>
        <CategoryForm {...this.props}/>
      </App>
    )
  }
}
