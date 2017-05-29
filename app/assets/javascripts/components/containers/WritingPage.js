import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as WritingActionCreators from '../../actions/writings'

import WritingList from '../writings/WritingList'
import WritingForm from '../writings/WritingForm'
import WritingItem from '../writings/WritingItem'

import { CONTAINER_CLASS, FULL_WIDE_CONTAINER_CLASS } from '../../constants/commons'

class WritingPage extends Component {
  static defaultProps = {
    writings: {},
    categories: {}
  }

  componentDidMount () {

  }

  getId () {
    return parseInt(this.props.params.id, 10) || undefined
  }

  getWriting () {
    const { list, selected } = this.props.writings
    const id = this.getId()

    if(selected && (parseInt(selected.id, 10) || undefined) === id) {
      return selected
    }

    if(list) {
      for(const writing of list) {
        if(writing.id === id) {
          let result = Object.assign({}, writing)
          delete result.id
          return result
        }
      }
    }

    return {}
  }

  getChildProps (type) {
    const {
      writings: { list, totalPage, page, categoryId },
      categories,
      params,
      session,
      dispatch
    } = this.props

    const { fetchWriting, fetchWritings, createWriting, updateWriting, deleteWriting } = bindActionCreators(WritingActionCreators, dispatch)

    const writing = this.getWriting()
    const id = this.getId()


    switch (type) {
    case WritingList:
      return {
        writings:  list || [],
        totalPage: totalPage,
        page,
        categoryId,

        fetchWritings,
      }

    case WritingForm:
      return {
        id,
        writing,
        session,
        categories: categories.list,

        fetchWriting,
        submit: (id ? updateWriting : createWriting)
      }

    case WritingItem:
      return {
        id,
        writing,
        loggedInNow: session.valid,
        authenticityToken: session.authenticityToken,

        fetchWriting,
        deleteWriting,
      }
    }
  }

  getContainerClass (type) {
    switch (type) {
    case WritingForm:
      return FULL_WIDE_CONTAINER_CLASS
    default:
      return CONTAINER_CLASS
    }
  }

  render () {
    const { children, writings, session, categories } = this.props

    const childrenWithProps = React.Children.map(children, (child) =>
      React.cloneElement(child, this.getChildProps(child.type))
    )

    const containerClass = this.getContainerClass(React.Children.toArray(this.props.children)[0].type)

    return (
      <div>
        <div className='writing-page'>
          {childrenWithProps}
        </div>
      </div>
    )
  }
}


function mapStateToProps (state, ownProps) {
  return state
}

export default connect(mapStateToProps)(WritingPage)
