import React, { Component } from 'react'
import { connect } from 'react-redux'

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
    // dispatch(fetchCatgories())
  }

  loadCategory (id = undefined, options = {}) {
    const { dispatch } = this.props
    // dispatch(fetchWriting(id, options))
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
    const { categories, parents } = this.props

    switch (type) {
    case CategoryList:
      return {
        onLoadCategories: this.loadCategories.bind(this),
        categories:     categories.list,
      }

    case CategoryForm:
      return {
        onLoadCategory: this.loadCategory.bind(this),
        onSaveCategory: this.saveCategory.bind(this),
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
