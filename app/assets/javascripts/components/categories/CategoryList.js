import React, { Component } from 'react'

import CategoryItem from './CategoryItem'

export default class CategoryList extends Component {
  componentWillMount () {
    const { onLoadCategories, categories } = this.props

    if(!categories) {
      onLoadCategories()
    }
  }

  // componentWillReceiveProps (nextProps) {
  //   const { onLoadCategories } = this.props
  // }

  render () {
    const categories = this.props.categories || []

    return (
      <div className='category-list'>
        Category List
        {categories.map(category =>
          <CategoryItem key={`category-item-${category.id}`}
                        className='category-list__category_item'
                        category={category}/>
        )}
      </div>
    )
  }
}
