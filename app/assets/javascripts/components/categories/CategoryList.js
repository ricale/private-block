import React, { Component } from 'react'

import CategoryItem from './CategoryItem'

export default class CategoryList extends Component {
  state = {

  }

  getModifiedClassName () {
    const className = 'category-list'

    let classNameWithModifier = ''

    if(this.props.singleLine) {
      classNameWithModifier += ` ${className}_single-line`
    }

    if(this.props.hideMenu) {
      classNameWithModifier += ` ${className}_hide-menu`
    }

    return classNameWithModifier
  }

  render () {
    const {authenticityToken, session, singleLine, hideMenu} = this.props
    const categories = this.props.categories || []
    const inlineItem = !!singleLine

    return (
      <div className={`category-list${this.getModifiedClassName()}`}>
        {categories.map(category =>
          <CategoryItem key={`category-item-${category.id}`}
                        className='category-list__category_item'
                        category={category}
                        inline={inlineItem}
                        hideMenu={hideMenu}
                        authenticityToken={(session && session.authenticityToken) || authenticityToken} />
        )}
      </div>
    )
  }
}
