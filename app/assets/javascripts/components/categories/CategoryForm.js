import React, { Component } from 'react'
import { Link } from 'react-router'

import InputWithLabel from '../commons/InputWithLabel'
import ElementsWithLabel from '../commons/ElementsWithLabel'

export default class CategoryForm extends Component {
  static defaultProps = {
    method: 'post',
    id: undefined,
    category: undefined
  }

  state = {
    category: this.props.category || {}
  }

  nameChanged (event) {
    this.setState({name: event.target.value})
  }

  parentChanged (event) {
    this.setState({parent_id: event.target.value})
  }

  onSubmit (event) {

  }

  getCancelUrl () {
    if(category) {
      return `/categories/${category.id}`
    } else {
      return 
    }
  }

  getRootCategoryId () {
    return 1
  }

  render () {
    const { category } = this.state
    const { parents } = this.props

    return (
      <form className='category-form form-horizontal'
            onSubmit={this.onSubmit.bind(this)}>
        <InputWithLabel id='category_name'
                        key='category_name'
                        name='category[name]'
                        className='category-form__name-input'
                        placeholde='Name'
                        labelText='Name'
                        value={category.name}
                        onChange={this.nameChanged.bind(this)}/>

        {category.id !== this.getRootCategoryId() &&
          <InputWithLabel id='category_parent_id'
                          key='category_parent_id'
                          name='category[parent_id]'
                          className='category-form__parent-select'
                          placeholder='Parent'
                          labelText='Parent'
                          elementType='select'
                          value={category.parent_id}
                          onChange={this.parentChanged.bind(this)}
                          options={parents}/>
        }

        <ElementsWithLabel>
          <input id='submit' type='submit' value='submit' />
          {' '}
          <Link to='/categories' id='cancel'>cancel</Link>
        </ElementsWithLabel>
      </form>
    )
  }
}
