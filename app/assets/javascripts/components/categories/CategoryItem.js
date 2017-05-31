import React, { Component } from 'react'
import Form from '../commons/Form';
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

  render () {
    const {category, className, inline, hideMenu, authenticityToken} = this.props

    return (
      <div className={`category-item${this.getModifiedClassName()} ${className}`}>
        <div className='category-item__name'>
          <NavLink href={this.getCategoryWritingListUrl(category)}>{category.name}</NavLink>
        </div>
        <div className='category-item__writing-count'>({category.writing_count})</div>

        {!inline && !hideMenu &&
          <div className='category-item__buttons-container'>
            <a href={`/categories/${category.id}/edit`} className='category-item__edit-button'>
              Edit
            </a>

            <Form
              action={`/categories/${category.id}`}
              method="DELETE"
              style={{display: 'inline-block'}}
              token={authenticityToken}
            >
              <input type='submit' value='Delete' style={{border: 0, background: 'none'}} />
            </Form>
          </div>
        }
      </div>
    )
  }
}
