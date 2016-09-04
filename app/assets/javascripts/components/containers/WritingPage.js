import React, { Component } from 'react'

import { connect } from 'react-redux'
import { fetchWritings, fetchWriting, createWriting, updateWriting, deleteWriting } from '../../actions/writings'

import WritingList from '../writings/WritingList'
import WritingForm from '../writings/WritingForm'
import WritingItem from '../writings/WritingItem'

class WritingPage extends Component {
  static defaultProps = {
    writings: {},
    categories: []
  }

  componentDidMount () {

  }

  loadWritings (categoryId = undefined, options = {}) {
    const { dispatch } = this.props
    dispatch(fetchWritings(categoryId, options))
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
    const { dispatch, authenticityToken } = this.props
    dispatch(deleteWriting(id, authenticityToken))
  }

  childrenProps (type) {
    const { writings, categories, params, query } = this.props

    switch (type) {
    case WritingList:
      return {
        onLoadWritings: this.loadWritings.bind(this),
        writings:       writings.list,
        categoryId:     params.categoryId,
        page:           query.page,
        totalPage:      writings.totalPage
      }

    case WritingForm:
      return {
        onLoadWriting: this.loadWriting.bind(this),
        onSaveWriting: this.saveWriting.bind(this),
        writing: writings.selected,
        id: params.id,
        categories,
      }

    case WritingItem:
      return {
        onLoadWriting: this.loadWriting.bind(this),
        onDeleteWriting: this.requestDeleteWriting.bind(this),
        writing: writings.selected,
        id: params.id
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
  const { params } = ownProps
  const { query } = ownProps.location

  return {
    writings: writings,
    categories: categories.list,

    authenticityToken: session.authenticityToken,

    params: params,
    query: query
  }
}

export default connect(mapStateToProps)(WritingPage)
