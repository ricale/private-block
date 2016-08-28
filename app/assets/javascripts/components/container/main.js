import React, { Component } from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import WritingMain from '../writings/_writing_main';

export default class Main extends Component {
  componentWillMount() {
    // store.dispatch(setCounter(this.props.counter));
  }

  render() {
    return (
      <div className='container'>
        <div className='col-md-offset-1 col-md-10'>
          <WritingMain />
        </div>
      </div>
    );
  }
}
