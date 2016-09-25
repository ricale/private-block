import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as WritingActionCreators from '../../actions/writings'

import MyHelmet from '../commons/MyHelmet'
import WritingList from '../writings/WritingList'
import WritingForm from '../writings/WritingForm'
import WritingItem from '../writings/WritingItem'

import { CONTAINER_CLASS } from '../../constants/commons'

class WritingPage extends Component {
  static defaultProps = {
    writings: {},
    categories: {}
  }

  componentDidMount () {

  }

  getChildProps (type) {
    const {
      writings: { list, selected, totalPage },
      categories,
      params,
      session,
      dispatch
    } = this.props

    const { fetchWriting, fetchWritings, createWriting, updateWriting, deleteWriting } = bindActionCreators(WritingActionCreators, dispatch)

    const id = parseInt(params.id, 10) || undefined
    const writing = selected || {}

    switch (type) {
    case WritingList:
      return {
        writings:  list || [],
        totalPage: totalPage,

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

  render () {
    const { writings, children, session } = this.props

    const childrenWithProps = React.Children.map(children, (child) =>
      React.cloneElement(child, this.getChildProps(child.type))
    )

    return (
      <div className='container'>
        <MyHelmet writing={writings.selected} initialPath={session.initialPath} />
        <div className={CONTAINER_CLASS}>
          <div className='writing-page'>
            {childrenWithProps}
          </div>
        </div>
      </div>
    )
  }
}


function mapStateToProps (state, ownProps) {
  return state
}

export default connect(mapStateToProps)(WritingPage)
