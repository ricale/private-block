import React, { Component } from 'react'

import CategoryItem from './CategoryItem'

export default class CategoryList extends Component {
  state = {

  }

  componentWillMount () {
    const { fetchCategories, categories } = this.props

    if(fetchCategories && (!categories || categories.length === 0)) {
      fetchCategories()
    }
  }

  // componentWillReceiveProps (nextProps) {
  //   const { onLoadCategories } = this.props
  // }

  getCssModifier () {
    const { singleLine } = this.props

    if(singleLine) {
      return '_single-line'
    } else {
      return ''
    }
  }

  render () {
    const { deleteCategory, authenticityToken, singleLine } = this.props
    const categories = this.props.categories || []
    const inlineItem = !!singleLine

    return (
      <div className={`category-list${this.getCssModifier()}`}>
        {categories.map(category =>
          <CategoryItem key={`category-item-${category.id}`}
                        className='category-list__category_item'
                        category={category}
                        inline={inlineItem}
                        deleteCategory={deleteCategory}
                        authenticityToken={authenticityToken} />
        )}
      </div>
    )
  }
}
