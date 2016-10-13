import React, { Component } from 'react'

import CategoryList from '../categories/CategoryList'

export default class Sidebar extends Component {
  

  render () {
    const { className, categories } = this.props

    return (
      <div className={className || ''}>
        <CategoryList categories={categories.list} hideMenu={true} />
      </div>
    )
  }
}
