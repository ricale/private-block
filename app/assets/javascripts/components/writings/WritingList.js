import React, { Component } from 'react'

import WritingItem from './WritingItem'

export default class WritingList extends Component {
  static defaultProps = {
    writings: []
  }

  componentDidMount () {
    const { onLoadWritings, categoryId } = this.props
    onLoadWritings(categoryId)
  }

  componentWillReceiveProps (nextProps) {
    const { onLoadWritings, categoryId } = this.props

    if(categoryId != nextProps.categoryId) {
      onLoadWritings(nextProps.categoryId)
    }
  }

  render () {
    const { writings } = this.props;

    return (
      <div className='writing-list'>
        {writings.map(writing =>
          <WritingItem key={`writing-item-${writing.id}`}
                       className='writing-list__writing-item'
                       writing={writing}
                       singleLine={true}/>
        )}
      </div>
    )
  }
}
