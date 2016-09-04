import React, { Component } from 'react'

import { connect } from 'react-redux'
import { fetchWritings, fetchWriting } from '../../actions/writings'

import WritingList from '../writings/WritingList'
import WritingForm from '../writings/WritingForm'
import WritingItem from '../writings/WritingItem'

class WritingPage extends Component {
  static defaultProps = {
    writings: [],
    categories: [],
    newWriting: {}
  }

  componentDidMount () {

  }

  loadWritings () {
    const { dispatch } = this.props
    dispatch(fetchWritings())
  }

  loadWriting (id = undefined, options = {}) {
    const { dispatch } = this.props
    dispatch(fetchWriting(id, options))
  }

  childrenProps (type) {
    const { writings, selectedWriting, id, categories } = this.props

    switch (type) {
    case WritingList:
      return {
        onLoadWritings: this.loadWritings.bind(this),
        writings
      }

    case WritingForm:
      return {
        onLoadWriting: this.loadWriting.bind(this),
        writing: selectedWriting,
        categories,
        id
      }

    case WritingItem:
      return {
        onLoadWriting: this.loadWriting.bind(this),
        writing: selectedWriting,
        id
      }
    }
  }

  render () {
    const { children } = this.props

    const childrenWithProps = React.Children.map(children, (child) =>
      React.cloneElement(child, this.childrenProps(child.type))
    )

    return (
      <div className='writing-page'>
        {childrenWithProps}
      </div>
    )
  }
}


function mapStateToProps (state, ownProps) {
  const { writings, categories } = state

  return {
    writings:        writings.list,
    selectedWriting: writings.selected,

    id: ownProps.params.id,

    categories: categories.list
  }
}

export default connect(mapStateToProps)(WritingPage)
