import React, { Component } from 'react'
import Measure from 'react-measure'

import WritingItem from './WritingItem'
import Pagination from '../commons/Pagination'

export default class WritingList extends Component {
  static defaultProps = {
    writings: []
  }

  render () {
    const { writings, totalPage, page, query } = this.props

    return (
      <div className='writing-list-container'>
        <div className='writing-list'>
          {writings.map(writing =>
            <WritingItem key={`writing-item-${writing.id}`}
                         className='writing-list__writing-item'
                         writing={writing}
                         singleLine={true}/>
          )}
        </div>

        {totalPage && totalPage > 1 && (
          <Pagination classModName='writing'
                      current={page}
                      total={totalPage}
                      pathname={'writings'}
                      query={query} />
        )}
      </div>
    )
  }
}
