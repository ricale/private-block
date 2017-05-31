import React, { Component } from 'react'

import Form from '../commons/Form';
import InputWithLabel from '../commons/InputWithLabel'
import ElementsWithLabel from '../commons/ElementsWithLabel'

export default class CategoryForm extends Component {
  static defaultProps = {
    category: undefined
  };

  constructor (props) {
    super(props);
    this.state = {
      category: props.category || {}
    }
    this.nameChanged = this.nameChanged.bind(this)
    this.parentChanged = this.parentChanged.bind(this)
  }

  componentWillMount () {
    const { category } = this.props

    if(!!category) {
      this.setState({category: category})
    }
  }

  nameChanged (event) {
    this.state.category.name = event.target.value
    this.forceUpdate()
  }

  parentChanged (event) {
    this.state.category.parent_id = event.target.value
    this.forceUpdate()
  }

  getUrl () {
    const { category } = this.state;
    if(category.id) {
      return `/categories/${category.id}`
    } else {
      return '/categories'
    }
  }

  getMethod () {
    const { category } = this.state;
    return category.id ? 'put' : 'post';
  }

  getRootCategoryId () {
    return 1
  }

  render () {
    const {parents, authenticityToken} = this.props
    const {category} = this.state

    return (
      <Form className='category-form form-horizontal' action={this.getUrl()} method={this.getMethod()} token={authenticityToken}>
        <InputWithLabel id='category_name'
                        key='category_name'
                        name='category[name]'
                        className='category-form__name-input'
                        placeholde='Name'
                        labelText='Name'
                        value={category.name}
                        onChange={this.nameChanged}/>

        {category.id !== this.getRootCategoryId() &&
          <InputWithLabel id='category_parent_id'
                          key='category_parent_id'
                          name='category[parent_id]'
                          className='category-form__parent-select'
                          placeholder='Parent'
                          labelText='Parent'
                          elementType='select'
                          value={category.parent_id}
                          onChange={this.parentChanged}
                          options={parents}/>
        }

        <ElementsWithLabel>
          <input id='submit' type='submit' value='submit' />
          {' '}
          <a href='/categories' id='cancel'>cancel</a>
        </ElementsWithLabel>
      </Form>
    )
  }
}
