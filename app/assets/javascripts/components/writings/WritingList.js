import React, { Component } from 'react'

import WritingItem from './WritingItem'
import Pagination from '../commons/Pagination'

export default class WritingList extends Component {
  static defaultProps = {
    writings: []
  }

  componentWillMount () {
    const {
      fetchWritings,
      params: { categoryId },
      location: { query: { page } }
    } = this.props

    fetchWritings(categoryId, { page })
  }

  componentWillReceiveProps (nextProps) {
    const {
      fetchWritings,
      params: { categoryId },
      location: {
        query: { page }
      }
    } = this.props

    const {
      params: { categoryId: nextPropsCategoryId },
      location: {
        query: { page: nextPropsPage }
      }
    } = nextProps

    if(categoryId != nextPropsCategoryId ||
       page != nextPropsPage) {

      fetchWritings(nextPropsCategoryId, {
        page: nextPropsPage
      })
    }
  }

  render () {
    const { writings, totalPage, location } = this.props;

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
                      current={location.query.page}
                      total={totalPage}
                      pathname={location.pathname}
                      query={location.query} />
        )}
      </div>
    )
  }
}
