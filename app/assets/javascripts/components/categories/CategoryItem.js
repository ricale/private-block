import React, { Component } from 'react'
import { Link } from 'react-router'

import NavLink from '../commons/NavLink'


export default class CategoryItem extends Component {
  static defaultProps = {
    category: {}
  }

  getModifiedClassName () {
    const { category, inline } = this.props
    const className = 'category-item'

    let classNameWithModifier = ''

    if(inline) {
      classNameWithModifier += ` ${className}_inline`
    }

    classNameWithModifier += ` ${className}_depth_${category.depth}`

    return classNameWithModifier
  }

  getRootCategoryId () {
    1
  }

  getCategoryWritingListUrl (category) {
    // if(category.depth !== 0) {
      return `/categories/${category.id}/writings`
    // } else {
    //   return '/writings'
    // }
  }

  onClickDeleteButton (event) {
    const { category, authenticityToken, deleteCategory } = this.props
    event.preventDefault()
    deleteCategory(category.id, authenticityToken)
  }

  render () {
    const { category, className, inline, hideMenu } = this.props

    return (
      <div className={`category-item${this.getModifiedClassName()} ${className}`}>
        <div className='category-item__name'>
          <NavLink to={this.getCategoryWritingListUrl(category)}>{category.name}</NavLink>
        </div>
        <div className='category-item__writing-count'>({category.writing_count})</div>

        {!inline && !hideMenu &&
          <div className='category-item__buttons-container'>
            <Link to={`/categories/${category.id}/edit`} className='category-item__edit-button'>
              Edit
            </Link>

            <a className='category-item__delete-button'
               href='#'
               onClick={this.onClickDeleteButton.bind(this)}>
              Delete
            </a>
          </div>
        }
      </div>
    )
  }
}
