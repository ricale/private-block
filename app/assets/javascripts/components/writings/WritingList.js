import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchWritings } from '../../actions'
import WritingItem from './WritingItem'

class WritingList extends Component {
  static defaultProps = {
    writings: []
  }

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

function mapStateToProps (state, ownProps) {
  const { writings } = state

  return {
    writings: writings.list
  }
}

export default connect(mapStateToProps)(WritingList)