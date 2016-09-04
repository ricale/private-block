import React, { Component } from 'react'

import WritingItem from './WritingItem'

export default class WritingList extends Component {
  static defaultProps = {
    writings: []
  }

  componentDidMount () {
    const { onLoadWritings } = this.props
    onLoadWritings()
  }

  componentWillReceiveProps (nextProps) {

  }

  render () {
    const { writings, authenticityToken } = this.props;

    return (
      <div className='writing-list'>
        {writings.map(writing =>
          <WritingItem key={`writing-item-${writing.id}`}
                       className='writing-list__writing-item'
                       writing={writing}
                       authenticityToken={authenticityToken}
                       singleLine={true}/>
        )}
      </div>
    )
  }
}
