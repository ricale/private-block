import React, { Component } from 'react'

import WritingItem from './WritingItem'
import Pagination from '../commons/Pagination'

export default class WritingList extends Component {
  static defaultProps = {
    writings: []
  }

  componentDidMount () {
    const { onLoadWritings, writings, params, location } = this.props

    if(!writings || writings.length == 0) {
      onLoadWritings(params.categoryId, {
        page: location.query.page
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    const { onLoadWritings, params, location } = this.props

    if(params.categoryId != nextProps.params.categoryId ||
       location.query.page != nextProps.location.query.page) {

      onLoadWritings(nextProps.params.categoryId, {
        page: nextProps.location.query.page
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
