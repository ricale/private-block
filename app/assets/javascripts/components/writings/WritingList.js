import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchWritings } from '../../actions'
import WritingItem from './WritingItem'

class WritingList extends Component {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(fetchWritings())
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

WritingList.defaultProps = {
  writings: []
}

function mapStateToProps (state, ownProps) {
  const { writings } = state

  return {
    writings
  }
}

export default connect(mapStateToProps)(WritingList)