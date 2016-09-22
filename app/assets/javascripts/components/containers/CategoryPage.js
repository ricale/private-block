import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchCategories, fetchCategory } from '../../actions/categories'

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

  loadCategories () {
    const { dispatch } = this.props
    dispatch(fetchCategories())
  }

  loadCategory (id = undefined) {
    const { dispatch } = this.props
    dispatch(fetchCategory(id))
  }

  saveCategory (category) {
    const { dispatch, session } = this.props
    // const data = {
    //   category,
    //   authenticity_token: session.authenticityToken
    // }

    // if(category.id) {
    //   dispatch(updateWriting(data))
    // } else {
    //   dispatch(createWriting(data))
    // }
  }

  // requestDeleteWriting (id) {
  //   const { dispatch, session } = this.props
  //   dispatch(deleteWriting(id, session.authenticityToken))
  // }

  childrenProps (type) {
    const { categories, parents, params } = this.props

    const id = parseInt(params.id, 10) || undefined

    switch (type) {
    case CategoryList:
      return {
        onLoadCategories: this.loadCategories.bind(this),
        categories:       categories.list,
      }

    case CategoryForm:
      return {
        onLoadCategory: this.loadCategory.bind(this),
        onSaveCategory: this.saveCategory.bind(this),
        id: id,
        parents: categories.parents,
        category: categories.selected
      }
    }
  }

  render () {
    const { children, session } = this.props

    const childrenWithProps = React.Children.map(children, (child) =>
      React.cloneElement(child, this.childrenProps(child.type))
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
