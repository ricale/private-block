import React, { Component } from 'react'
import { a, browserHistory } from 'react-router'
import Measure from 'react-measure'

import App from '../containers/App';
import WritingItem from './WritingItem';

export default class Writing extends Component {
  render () {
    return (
      <App {...this.props}>
        <WritingItem {...this.props} />
      </App>
    )
  }
}
