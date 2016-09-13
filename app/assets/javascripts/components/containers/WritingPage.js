import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import { fetchWritings, fetchWriting, createWriting, updateWriting, deleteWriting } from '../../actions/writings'

import WritingList from '../writings/WritingList'
import WritingForm from '../writings/WritingForm'
import WritingItem from '../writings/WritingItem'

import { CONTAINER_CLASS } from '../../constants/commons'

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
    const { dispatch, session } = this.props
    const data = {
      writing,
      authenticity_token: session.authenticityToken
    }

    if(writing.id) {
      dispatch(updateWriting(data))
    } else {
      dispatch(createWriting(data))
    }
  }

  requestDeleteWriting (id) {
    const { dispatch, session } = this.props
    dispatch(deleteWriting(id, session.authenticityToken))
  }

  childrenProps (type) {
    const { writings, categories, params, query, pathname, session } = this.props

    switch (type) {
    case WritingList:
      return {
        onLoadWritings: this.loadWritings.bind(this),
        writings:       writings.list,
        categoryId:     params.categoryId,
        page:           parseInt(query.page, 10) || undefined,
        totalPage:      writings.totalPage,
        query:          query,
        pathname:       pathname
      }

    case WritingForm:
      return {
        onLoadWriting: this.loadWriting.bind(this),
        onSaveWriting: this.saveWriting.bind(this),
        writing: writings.selected,
        id: params.id,
        categories,
        session
      }

    case WritingItem:
      return {
        onLoadWriting: this.loadWriting.bind(this),
        onDeleteWriting: this.requestDeleteWriting.bind(this),
        writing: writings.selected,
        id: params.id,
        loggedInNow: session.valid
      }
    }
  }

  renderHelmet () {
    const { writings, pathname } = this.props

    let title;
    if(writings.selected) {
      title = writings.selected.title
    } else {
      title = undefined
    }

    const type = 'article'
    const url = window.location.href

    return (
       <Helmet title={title}
                titleTemplate='%s :: weblog ricale st.'
                defaultTitle='weblog ricale st.'
                meta={[
                  {"name": "og:title", "content": title},
                  {"name": "og:type",  "content": type},
                  {"name": "og:url",   "content": url}
                ]} />
    )
  }

  render () {
    const { children } = this.props

    const childrenWithProps = React.Children.map(children, (child) =>
      React.cloneElement(child, this.childrenProps(child.type))
    )

    return (
      <div className='container'>
        {this.renderHelmet()}
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
  const { writings, categories, session } = state
  const { params } = ownProps
  const { query, pathname } = ownProps.location

  return {
    writings: writings,
    categories: categories.list,

    session: session,

    params: params,
    query: query,
    pathname: pathname
  }
}

export default connect(mapStateToProps)(WritingPage)
