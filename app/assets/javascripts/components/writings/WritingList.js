import React, { Component } from 'react'
import Measure from 'react-measure'

import WritingItem from './WritingItem'
import Pagination from '../commons/Pagination'
import LoadingIndicator from '../commons/LoadingIndicator'

import App from '../containers/App';

export default class WritingList extends Component {
  static defaultProps = {
    writings: []
  }

  render () {
    const { writings, totalPage, page, location } = this.props

    return (
      <App {...this.props}>
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
                        pathname={'writings'/*location.pathname*/}
                        query={{}/*location.query*/} />
          )}
        </div>
      </App>
    )
  }
}
