import React, { Component } from 'react'

import CategoryItem from './CategoryItem'

export default class CategoryList extends Component {
  state = {

  }

  componentWillMount () {
    const { fetchCategories, categories } = this.props

    if(!categories || categories.length === 0) {
      fetchCategories()
    }
  }

  // componentWillReceiveProps (nextProps) {
  //   const { onLoadCategories } = this.props
  // }

  render () {
    const { deleteCategory, authenticityToken } = this.props
    const categories = this.props.categories || []

    return (
      <div className='category-list'>
        {categories.map(category =>
          <CategoryItem key={`category-item-${category.id}`}
                        className='category-list__category_item'
                        category={category}
                        deleteCategory={deleteCategory}
                        authenticityToken={authenticityToken} />
        )}
      </div>
    )
  }
}
