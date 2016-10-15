import React, { Component } from 'react'

import CategoryList from '../categories/CategoryList'

export default class Sidebar extends Component {
  state = {
    show: false
  }

  onToggleButtonClick () {
    this.setState({show: !this.state.show})
  }

  render () {
    const { className, categories } = this.props

    const visibleClassName = this.state.show ? '' : 'hide'

    return (
      <div className={`sidebar ${className || ''}`}>
        <span className='sidebar__toggle-button' onClick={this.onToggleButtonClick.bind(this)}>button</span>
        <div className={`sidebar__contents ${visibleClassName}`}>
          <CategoryList categories={categories.list} hideMenu={true} />
        </div>
      </div>
    )
  }
}
