import React, { Component } from 'react'

import WritingItem from './WritingItem'
import Pagination from '../commons/Pagination'

export default class WritingList extends Component {
  static defaultProps = {
    writings: []
  }

  componentDidMount () {
    const { onLoadWritings, categoryId, page } = this.props
    onLoadWritings(categoryId, {
      page
    })
  }

  componentWillReceiveProps (nextProps) {
    const { onLoadWritings, categoryId, page } = this.props

    if(categoryId != nextProps.categoryId ||
       page != nextProps.page) {

      onLoadWritings(nextProps.categoryId, {
        page: nextProps.page
      })
    }
  }

  render () {
    const { writings, page, totalPage, query, pathname } = this.props;

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
                      pathname={pathname}
                      query={query} />
        )}
      </div>
    )
  }
}
