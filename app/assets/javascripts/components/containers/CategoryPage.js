import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as CategoryActionCreators from '../../actions/categories'

import MyHelmet from '../commons/MyHelmet'
import CategoryList from '../categories/CategoryList'
import CategoryForm from '../categories/CategoryForm'

import { CONTAINER_CLASS } from '../../constants/commons'

class CategoryPage extends Component {
  static defaultProps = {
    categories: {}
  }

  componentDidMount () {

  }

  // loadCategories () {
  //   const { dispatch } = this.props
  //   dispatch(fetchCategories())
  // }

  // loadCategory (id = undefined) {
  //   const { dispatch } = this.props
  //   dispatch(fetchCategory(id))
  // }

  // saveCategory (category) {
  //   const { dispatch, session } = this.props
  //   const data = {
  //     category,
  //     authenticity_token: session.authenticityToken
  //   }

  //   if(category.id) {
  //     dispatch(updateCategory(data))
  //   } else {
  //     dispatch(createCategory(data))
  //   }
  // }

  // requestDeleteWriting (id) {
  //   const { dispatch, session } = this.props
  //   dispatch(deleteWriting(id, session.authenticityToken))
  // }

  getChildProps (type) {
    const { categories, parents, session, params, dispatch } = this.props
    const boundActionCreators = bindActionCreators(CategoryActionCreators, dispatch)

    const id = parseInt(params.id, 10) || undefined
    let childProps

    switch (type) {
    case CategoryList:
      childProps = {
        categories:       categories.list,
      }
      break

    case CategoryForm:
      childProps = {
        id: id,
        parents: categories.parents,
        category: categories.selected,
        authenticityToken: session.authenticityToken
      }
      break
    }

    return Object.assign(childProps, boundActionCreators)
  }

  render () {
    const { children, session } = this.props

    const childrenWithProps = React.Children.map(children, (child) =>
      React.cloneElement(child, this.getChildProps(child.type))
    )

    return (
      <div className='container'>
        {/*<MyHelmet writing={writings.selected} initialPath={session.initialPath} />*/}
        <div className={CONTAINER_CLASS}>
          <div className='category-page'>
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

export default connect(mapStateToProps)(CategoryPage)
