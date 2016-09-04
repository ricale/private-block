import React, { Component } from 'react'

import { connect } from 'react-redux'
import { fetchWritings, fetchNewWriting, fetchWriting } from '../../actions/writings'

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

  loadNewWriting () {
    const { dispatch } = this.props
    dispatch(fetchNewWriting())
  }

  loadWriting (id) {
    const { dispatch } = this.props
    dispatch(fetchWriting(id))
  }

  childrenProps (type) {
    const { writings, newWriting, selectedWriting, id, categories } = this.props

    switch (type) {
    case WritingList:
      return {
        onLoadWritings: this.loadWritings.bind(this),
        writings
      }

    case WritingForm:
      return {
        onLoadNewWriting: this.loadNewWriting.bind(this),
        writing: newWriting,
        categories
      }

    case WritingItem:
      return {
        onLoadWriting: this.loadWriting.bind(this),
        writing: selectedWriting,
        id: id
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
    newWriting:      writings.new,
    selectedWriting: writings.selected,

    id: ownProps.params.id,

    categories: categories.list
  }
}

export default connect(mapStateToProps)(WritingPage)
