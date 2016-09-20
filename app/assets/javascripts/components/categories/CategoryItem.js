import React, { Component } from 'react'
import { Link } from 'react-router'


export default class CategoryItem extends Component {
  static defaultProps = {
    category: {}
  }

  getCssModifier () {
    const { category } = this.props

    if(category.depth !== 0) {
      return `_depth_${category.depth}`
    } else {
      return ''
    }
  }

  getRootCategoryId () {
    1
  }

  onClickDeleteButton (event) {
    event.preventDefault()
  }

  render () {
    const { category, className } = this.props

    return (
      <div className={`category-item${this.getCssModifier()} ${className}`}>
        <div className='category-item__name'>{category.name}</div>

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
      </div>
    )
  }
}
