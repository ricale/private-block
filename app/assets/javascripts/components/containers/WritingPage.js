import React, { Component } from 'react'

import { connect } from 'react-redux'
import { fetchWritings, fetchWriting, createWriting, updateWriting } from '../../actions/writings'

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

  saveWriting (writing) {
    const { dispatch, authenticityToken } = this.props
    const data = {
      writing,
      authenticity_token: authenticityToken
    }

    if(writing.id) {
      dispatch(updateWriting(data))
    } else {
      dispatch(createWriting(data))
    }
  }

  requestDeleteWriting (id) {
    const { dispatch } = this.props
    dispatch(deleteWriting(id))
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
        onSaveWriting: this.saveWriting.bind(this),
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
  const { writings, categories, session } = state

  return {
    writings:        writings.list,
    selectedWriting: writings.selected,

    id: ownProps.params.id,

    categories: categories.list,

    authenticityToken: session.authenticityToken
  }
}

export default connect(mapStateToProps)(WritingPage)
