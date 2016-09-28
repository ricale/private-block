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

  getChildProps (type) {
    const {
      categories: { list, parents, selected },
      session: { authenticityToken },
      params,
      dispatch
    } = this.props

    const { fetchCategory, fetchCategories, createCategory, updateCategory, deleteCategory } = bindActionCreators(CategoryActionCreators, dispatch)

    const id = parseInt(params.id, 10) || undefined

    switch (type) {
    case CategoryList:
      return {
        categories: list,
        authenticityToken,

        fetchCategories,
        deleteCategory,
      }

    case CategoryForm:
      return {
        id: id,
        category: selected,
        parents,
        authenticityToken,

        fetchCategory,
        submit: (id ? updateCategory : createCategory)
      }
    }
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
