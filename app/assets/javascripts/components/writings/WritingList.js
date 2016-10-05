import React, { Component } from 'react'
import Measure from 'react-measure'

import WritingItem from './WritingItem'
import Pagination from '../commons/Pagination'
import LoadingIndicator from '../commons/LoadingIndicator'

export default class WritingList extends Component {
  static defaultProps = {
    writings: []
  }

  state = {

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

    let {
      params: { categoryId: nextPropsCategoryId },
      location: {
        query: { page: nextPropsPage }
      }
    } = nextProps

    if(categoryId !== nextPropsCategoryId || page !== nextPropsPage) {
      fetchWritings(nextPropsCategoryId, {
        page: nextPropsPage
      })
    }
  }

  isLoadingNow () {
    const { page, categoryId, params, location } = this.props

    const paramCategoryId = params.categoryId   ? parseInt(params.categoryId, 10)   : null
    const queryPage       = location.query.page ? parseInt(location.query.page, 10) : 1

    return page !== queryPage || categoryId !== paramCategoryId
  }

  render () {
    const { writings, totalPage, page, categoryId, params, location } = this.props

    return (
      <Measure whitelist={['height']}>
      {dimensions =>

      <div className='writing-list-container'>
        {this.isLoadingNow() &&
          <LoadingIndicator height={`${dimensions.height || 0}px`}/>
        }

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

      }
      </Measure>
    )
  }
}
